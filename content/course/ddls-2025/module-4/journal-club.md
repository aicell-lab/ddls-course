---
title: "Journal Club 4"
date: '2025-09-22'
weight: 20
type: book
---

This week, please read the paper titled as "[Toward a privacy-preserving predictive foundation model of single-cell transcriptomics with federated learning and tabular modeling](https://www.biorxiv.org/content/10.1101/2025.01.06.631427v1)".

## Abstract

The ability to pre-train on vast amounts of data to build foundation models (FMs) has achieved remarkable success in numerous domains, including natural language processing, computer vision, and, more recently, single-cell genomics—epitomized by GeneFormer, scGPT, and scFoundation. However, as single-cell FMs begin to train on increasingly large corpora, significant privacy and ethical concerns arise. Moreover, unlike text data, single-cell data is unordered and exhibits a unique tabular structure that most existing single-cell FMs overlook. In this study, we propose Tabula, a privacy-preserving and tabular-structure aware FM designed with federated learning (FL) and tabular modeling. Tabula combines the advantages of FMs and FL, enabling collaborative model training across multiple clients without compromising data privacy. In contrast to earlier single-cell FMs—which treat single-cell data like natural language (viewing cells as “words” defined by genes)—Tabula introduces a novel pretraining strategy that explicitly models the tabular structure of single-cell data. Extensive experimental results show that Tabula outperforms state-of-the-art methods in various downstream tasks (including cell type annotation, gene imputation, gene perturbation, multi-batch integration, and multi-omics integration) while requiring only half the data for pretraining and preserving data privacy. Furthermore, Tabula accurately reveals pairwise and even combinatorial regulatory logic across diverse biological systems, including hematopoiesis, pancreatic endogenesis, neurogenesis, and cardiogenesis. Thus, Tabula provides a new foundation model that explicitly incorporates the tabular nature of single-cell data alongside FL, paving the way for creating a “virtual cell” for human health under critical privacy preservation.

## Assignment

- Read the paper and use the [Question Sheet](/question-sheet-v2/) which contains a set of questions designed to guide your reading and understanding.
- Fill out your question sheet and submit before the journal club.
- Be ready to discuss in the journal club.

{{< cta cta_text="Click Here to Submit" cta_link="https://forms.gle/aBPwiBs1B4k7bDfd8" >}}

**Deadline**: Submit your PDF before the journal club session.

## Join the Journal Club

During the journal club, we will walk through the question sheet together. Everyone will be selected at random to answer one or more questions from the question sheet, and/or describe selected figures.

Note that it is mandatory to attend the journal club session, and participate in the discussion.

{{< cta cta_text="Show the Journal Club Question Sheet" cta_link="/slides/question-sheet-v2/" >}}
