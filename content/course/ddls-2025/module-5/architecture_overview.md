---
title: "BINN Model Architecture Overview"
date: 2026-01-01
weight: 10
type: book
---

# BINN Model Architecture Overview

The **Biologically Informed Neural Network (BINN)** is a specialized deep learning architecture that integrates biological pathway knowledge into the structure of neural networks. This document provides a comprehensive overview of the BINN architecture and its components.

## Core Concept

Unlike traditional fully-connected neural networks, BINN creates a **sparse neural network** where connections between layers are determined by biological pathway relationships. This ensures that the network structure reflects known biological interactions rather than arbitrary connections.

## Architecture Components

### 1. **Pathway Network Foundation**

The BINN architecture is built upon a `PathwayNetwork` that processes biological pathway data:

```python
# Core pathway network construction
pn = dataframes_to_pathway_network(
    data_matrix=data_matrix,
    pathway_df=pathways,        # Biological pathway edges
    mapping_df=mapping,         # Feature-to-pathway mapping
    input_col=input_col,
    target_col=target_col,
    source_col=source_col,
    entity_col=entity_col,
    translation_col=translation_col,
)
```

**Key Functions:**
- **Input Processing**: Maps input features (e.g., proteins, genes) to pathway nodes
- **Pathway Expansion**: Creates hierarchical layers by traversing pathway relationships
- **Connectivity Generation**: Produces sparse connectivity matrices for each layer

### 2. **Network Architecture Types**

BINN supports two distinct architectural patterns:

#### A. **Sequential Architecture** (Default: `heads_ensemble=False`)

Traditional deep learning structure with biologically-informed sparsity:

```
Input Layer → Hidden Layer 1 → Hidden Layer 2 → ... → Output Layer
    |              |              |                      |
[Proteins]    [Pathways L1]   [Pathways L2]         [Classes]
```

**Layer Structure:**
```python
# Each layer contains:
- Linear(in_features, out_features)
- BatchNorm1d(out_features)
- Dropout(dropout_rate)
- Activation (tanh/relu/sigmoid/etc.)
```

#### B. **Ensemble of Heads Architecture** (`heads_ensemble=True`)

Multi-head approach where each hidden layer contributes directly to the final prediction:

```
Input → Hidden L1 ──┬─→ Head 1 ──┐
              ↓     │             │
            Hidden L2 ─→ Head 2 ──┤
              ↓     │             │  Sum → Final Output
            Hidden L3 ─→ Head 3 ──┤
              ↓                   │
            ... ──────→ Head N ──┘
```

**Benefits:**
- Multiple prediction pathways
- Enhanced interpretability
- Gradient flow improvement

### 3. **Connectivity Matrices**

The heart of BINN's biological integration lies in its **connectivity matrices**:

```python
# Example connectivity matrix structure
connectivity_matrices = [
    # Matrix 0: Input features → First hidden layer
    pd.DataFrame([[1, 0, 1],    # Protein_A connects to Pathway_1 and Pathway_3
                  [0, 1, 0],    # Protein_B connects to Pathway_2
                  [1, 1, 0]]),  # Protein_C connects to Pathway_1 and Pathway_2
    
    # Matrix 1: First hidden → Second hidden layer
    pd.DataFrame([[1, 1],       # Pathway_1 connects to Higher_Pathway_1 and Higher_Pathway_2
                  [0, 1],       # Pathway_2 connects to Higher_Pathway_2
                  [1, 0]]),     # Pathway_3 connects to Higher_Pathway_1
    # ... additional layers
]
```

### 4. **Sparse Weight Pruning**

BINN enforces biological constraints through **structured pruning**:

```python
# Apply biological mask to linear layers
mask = torch.tensor(connectivity_matrices[i].T.values, dtype=torch.float32)
prune.custom_from_mask(linear_layer, name="weight", mask=mask)
```

**Result**: Only biologically meaningful connections are preserved, creating interpretable sparse networks.

## Detailed Layer Construction

### Sequential Network Generation

```python
def _generate_sequential(layer_sizes, connectivity_matrices, activation, n_outputs, dropout):
    layers = []
    
    for i in range(len(layer_sizes) - 1):
        in_size = layer_sizes[i]
        out_size = layer_sizes[i + 1]
        
        # Core linear transformation
        lin = nn.Linear(in_size, out_size, bias=True)
        layers.append((f"Layer_{i}", lin))
        
        # Batch normalization for training stability
        layers.append((f"BatchNorm_{i}", nn.BatchNorm1d(out_size)))
        
        # Apply biological connectivity mask
        if connectivity_matrices is not None:
            mask = torch.tensor(connectivity_matrices[i].T.values, dtype=torch.float32)
            prune.custom_from_mask(lin, name="weight", mask=mask)
        
        # Regularization
        layers.append((f"Dropout_{i}", nn.Dropout(dropout)))
        
        # Non-linear activation
        layers.append((f"Activation_{i}", get_activation(activation)))
    
    # Final classification layer
    layers.append(("Output", nn.Linear(layer_sizes[-1], n_outputs, bias=True)))
    
    return nn.Sequential(OrderedDict(layers))
```

### Ensemble of Heads Generation

```python
class _EnsembleHeads(nn.Module):
    def __init__(self, layer_sizes, connectivity_matrices, activation, n_outputs):
        # Main processing blocks
        self.blocks = nn.ModuleList()
        # Individual prediction heads
        self.heads = nn.ModuleList()
        
        for i in range(len(layer_sizes) - 1):
            # Main transformation block
            block = create_layer_block(layer_sizes[i], layer_sizes[i+1], 
                                     connectivity_matrices[i], activation)
            self.blocks.append(block)
            
            # Individual prediction head
            head = nn.Sequential(
                nn.Linear(layer_sizes[i+1], n_outputs),
                nn.Sigmoid()
            )
            self.heads.append(head)
    
    def forward(self, x):
        sum_heads = None
        
        for block, head in zip(self.blocks, self.heads):
            x = block(x)                    # Transform input
            head_output = head(x)           # Generate prediction
            sum_heads = head_output if sum_heads is None else sum_heads + head_output
        
        return sum_heads
```

## Key Architectural Features

### 1. **Biological Constraint Integration**
- **Pathway-Based Connectivity**: Network connections reflect real biological relationships
- **Hierarchical Structure**: Mimics the hierarchical nature of biological pathways
- **Feature-to-Function Mapping**: Direct mapping from molecular features to biological functions

### 2. **Interpretability**
- **Layer Names**: Each layer corresponds to specific biological pathway levels
- **Connection Traceability**: Every connection can be traced back to biological evidence
- **SHAP Integration**: Built-in support for explaining predictions through pathway importance

### 3. **Flexibility**
- **Multiple Input Types**: Supports proteins (UniProt), miRNAs (miRBase), or custom features
- **Configurable Depth**: Adjustable number of layers (typically 3-6)
- **Multiple Activations**: Support for tanh, ReLU, sigmoid, ELU, etc.
- **Custom Pathways**: Can use custom pathway databases beyond Reactome

### 4. **Regularization**
- **Structured Sparsity**: Biological constraints provide natural regularization
- **Dropout**: Traditional dropout for additional regularization
- **Batch Normalization**: Stabilizes training in sparse networks

## Initialization and Configuration

### Basic BINN Creation

```python
from binn import BINN

# Using pre-loaded Reactome pathways
binn = BINN(
    data_matrix=data_matrix,          # Input feature matrix
    network_source="reactome",        # Use Reactome pathway database
    input_source="uniprot",           # Input features are UniProt IDs
    n_layers=4,                       # Network depth
    n_outputs=2,                      # Binary classification
    dropout=0.2,                      # Dropout rate
    activation="tanh",                # Activation function
    heads_ensemble=False,             # Use sequential architecture
    device="cpu"                      # Computing device
)
```

### Custom Pathway Networks

```python
# Using custom pathway data
binn = BINN(
    data_matrix=data_matrix,
    mapping=custom_mapping_df,        # Custom feature-to-pathway mapping
    pathways=custom_pathways_df,      # Custom pathway relationships
    entity_col="Gene",               # Feature column name
    input_col="gene_id",             # Mapping input column
    translation_col="pathway_id",     # Mapping output column
    source_col="source_pathway",      # Pathway source column
    target_col="target_pathway",      # Pathway target column
    n_layers=5,
    heads_ensemble=True              # Use ensemble architecture
)
```

## Network Properties

### Layer Sizes and Connectivity
The network automatically determines layer sizes based on pathway structure:

```python
# Example layer progression for a typical protein network
Layer 0 (Input):    555 proteins
Layer 1 (Level 1):  1847 pathways  
Layer 2 (Level 2):  306 pathways
Layer 3 (Level 3):  125 pathways
Layer 4 (Level 4):  28 pathways
Output Layer:       2 classes
```

### Memory and Computational Efficiency
- **Sparse Matrices**: Only non-zero connections are computed
- **Reduced Parameters**: Typically 60-90% fewer parameters than fully-connected networks
- **Faster Training**: Sparse structure accelerates both forward and backward passes

## Applications and Use Cases

### 1. **Biomarker Discovery**
- Identify important proteins/genes for disease classification
- Trace biomarker significance through biological pathways
- Understand mechanistic basis of biomarker importance

### 2. **Pathway Analysis**
- Determine which biological pathways are most relevant for specific conditions
- Understand pathway interactions and hierarchies
- Validate pathway-based hypotheses

### 3. **Drug Discovery**
- Identify potential drug targets within relevant pathways
- Understand mechanism of action through pathway analysis
- Predict drug effects based on pathway involvement

### 4. **Precision Medicine**
- Patient stratification based on pathway-level features
- Personalized treatment recommendations
- Understanding individual pathway dysregulation patterns

## Model Output and Interpretation

### Standard Output
```python
# Forward pass returns class probabilities
output = binn(input_tensor)  # Shape: [batch_size, n_outputs]
```

### Interpretability Features
```python
# Access layer names for interpretation
print("Layer 0 features:", binn.layer_names[0])  # Input features
print("Layer 1 pathways:", binn.layer_names[1])  # First pathway level
print("Layer 2 pathways:", binn.layer_names[2])  # Second pathway level

# Access connectivity matrices
print("Input to Layer 1 connections:", binn.connectivity_matrices[0])
print("Layer 1 to Layer 2 connections:", binn.connectivity_matrices[1])
```

## Summary

The BINN architecture represents a paradigm shift from traditional "black box" neural networks to **biologically interpretable** deep learning models. By integrating pathway knowledge directly into the network structure, BINN provides:

- **Biological Relevance**: Every connection has biological meaning
- **Enhanced Interpretability**: Predictions can be traced through biological pathways  
- **Improved Generalization**: Biological constraints reduce overfitting
- **Scientific Insight**: Model explanations provide biological hypotheses

This makes BINN particularly valuable for applications in genomics, proteomics, and systems biology where both prediction accuracy and biological understanding are crucial.