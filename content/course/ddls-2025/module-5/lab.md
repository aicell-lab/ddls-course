---
title: "Computer Lab 4: scRNASeq — Classic and MCP/Gemini"
linkTitle: "Computer Lab 5"
date: 2025-09-26
weight: 10
type: book
---

Module 5 Computer Lab: Biologically Informed Neural Networks (BINN)

---

# BINN Data Files Explanation

This document explains the 4 data files that are (partially) required to train the Biologically Informed Neural Network (BINN).

## Overview

The BINN takes 4 files:
1. **Your datamatrix** (Required)
2. **Your design matrix** (Required)
3. **Optional:** A file describing the pathways which will be used to build the network
4. **Optional:** A mapping between the input format and the pathway format

Instead of providing files 3 and 4, you can use pre-loaded pathway files. BINN currently supports input in the format of UniProt IDs or miRBase and the Reactome pathway database for the underlying structure.

## Detailed File Descriptions

### 1. **Data Matrix** (Required)
**Example file:** `sample_datamatrix.csv`

**Content & Format:**
- A **samples × features** matrix containing the input data (e.g., protein expression levels)
- **Format:** CSV file with features as rows and samples as columns
- **Structure:**
  - First column: Feature identifiers (e.g., "Protein" column with UniProt IDs like "P08603", "P02671")
  - Remaining columns: Sample measurements with descriptive sample names (e.g., "TM_P1911_190", "TM_M2012_010")
  - Values: Numerical measurements (typically log-transformed expression levels)

**Example:**
```csv
Protein,TM_P1911_190,TM_P1911_191,TM_M2012_010,TM_M2012_011
P08603,22.38,22.77,23.11,23.18
P02671,25.35,25.43,23.98,26.08
P01042,22.06,21.87,22.96,22.77
```

### 2. **Design Matrix** (Required) 
**Example file:** `sample_design_matrix.tsv`

**Content & Format:**
- Maps each sample to its experimental group/condition for supervised learning
- **Format:** Tab-separated values (TSV) file
- **Structure:**
  - `sample` column: Sample identifiers matching the column names in the data matrix
  - `group` column: Class labels/group assignments (e.g., 1, 2 for binary classification)

**Example:**
```tsv
sample	group
TM_P1911_190	2
TM_P1911_191	2
TM_M2012_010	1
TM_M2012_011	1
```

### 3. **Pathway Hierarchical Structure** (Optional - pre-loaded available)
**Example file:** `reactome_pathways_relation_2025_01_14.txt`

**Content & Format:**
- Defines the hierarchical relationships between pathways to build the network structure
- **Format:** Tab-separated file with pathway parent-child relationships
- **Structure:**
  - Column 1: Parent pathway ID (e.g., "R-BTA-109581")  
  - Column 2: Child pathway ID (e.g., "R-BTA-109606")
  - Each row represents a directed edge in the pathway hierarchy

**Example:**
```tsv
R-BTA-109581	R-BTA-109606
R-BTA-109581	R-BTA-169911
R-BTA-109582	R-BTA-140877
```

**Additional pathway information available:**
- `reactome_pathways_names_2025_01_21.txt`: Contains pathway IDs, names, and species information

### 4. **Feature-to-Pathway Mapping** (Optional - pre-loaded available)
**Example files:** 
- `uniprot_2_reactome_2025_01_14.txt` (for protein data)
- `mirbase_2_reactome_2025_01_16.txt` (for miRNA data)

**Content & Format:**
- Maps input features (proteins/genes/miRNAs) to their associated biological pathways
- **Format:** Tab-separated file linking molecular entities to pathways
- **Structure:**
  - Column 1: Feature identifier (e.g., UniProt ID "A0A023GPK8" or miRBase ID "MI0000060")
  - Column 2: Reactome pathway ID (e.g., "R-DME-373753")
  - Column 3: Pathway URL
  - Column 4: Pathway name (e.g., "Nephrin family interactions")
  - Column 5: Evidence code
  - Column 6: Species

**Example (UniProt mapping):**
```tsv
A0A023GPK8	R-DME-373753	https://reactome.org/...	Nephrin family interactions	IEA	Drosophila melanogaster
A0A023GRW3	R-DME-72163	https://reactome.org/...	mRNA Splicing - Major Pathway	IEA	Drosophila melanogaster
```

**Example (miRBase mapping):**
```tsv
MI0000060	R-HSA-9839394	https://reactome.org/...	TGFBR3 expression	TAS	Homo sapiens
MI0000063	R-HSA-9708530	https://reactome.org/...	Regulation of BACH1 activity	TAS	Homo sapiens
```

## Pre-loaded Options

Instead of providing files 3 and 4, you can use `network_source="reactome"` when initializing the BINN, which automatically loads:
- **UniProt protein mappings** to Reactome pathways
- **miRBase miRNA mappings** to Reactome pathways  
- **Reactome pathway hierarchy** for network structure

## Usage Examples

### Using pre-loaded pathways (recommended):
```python
from binn import BINN, BINNDataLoader, BINNTrainer
import pandas as pd

# Load your data (files 1 & 2 only)
data_matrix = pd.read_csv("sample_datamatrix.csv")
design_matrix = pd.read_csv("sample_design_matrix.tsv", sep="\t")

# Initialize BINN with pre-loaded Reactome pathways
binn = BINN(data_matrix=data_matrix, network_source="reactome", n_layers=4, dropout=0.2)

# Create DataLoaders
binn_dataloader = BINNDataLoader(binn)
dataloaders = binn_dataloader.create_dataloaders(
    data_matrix=data_matrix,
    design_matrix=design_matrix,
    feature_column="Protein",
    group_column="group",
    sample_column="sample",
    batch_size=32,
    validation_split=0.2,
)
```

### Using custom pathway files:
```python
# Load custom pathway data
mapping = pd.read_csv("custom_mapping.txt", sep="\t")
pathways = pd.read_csv("custom_pathways.txt", sep="\t")

# Initialize BINN with custom pathways
binn = BINN(
    data_matrix=data_matrix,
    use_reactome=False,
    mapping=mapping,
    pathways=pathways,
    n_layers=4,
    dropout=0.2
)
```

## Key Points

1. **Only files 1 and 2 are required** when using the pre-loaded Reactome database
2. The **data matrix structure is critical** - features must be rows, samples must be columns
3. **Sample names must match** between the data matrix columns and design matrix rows
4. The BINN uses these files to construct a **biologically-informed neural network** where the architecture follows the hierarchical structure of biological pathways
5. This ensures that the model's connections reflect **known biological relationships** rather than arbitrary fully-connected layers