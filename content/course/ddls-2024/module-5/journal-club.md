---
title: "Journal Club 5"
date: '2024-09-20'
weight: 20
type: book
---

This week, please read the paper titled as "[Trackastra: Transformer-based cell tracking for live-cell microscopy](https://arxiv.org/abs/2405.15700)".

## Abstract

Cell tracking is a ubiquitous image analysis task in live-cell microscopy. Unlike multiple object tracking (MOT) for natural images, cell tracking typically involves hundreds of similar-looking objects that can divide in each frame, making it a particularly challenging problem. Current state-of-the-art approaches follow the tracking-by-detection paradigm, i.e. first all cells are detected per frame and successively linked in a second step to form biologically consistent cell tracks. Linking is commonly solved via discrete optimization methods, which require manual tuning of hyperparameters for each dataset and are therefore cumbersome to use in practice. Here we propose Trackastra, a general purpose cell tracking approach that uses a simple transformer architecture to directly learn pairwise associations of cells within a temporal window from annotated data. Importantly, unlike existing transformer-based MOT pipelines, our learning architecture also accounts for dividing objects such as cells and allows for accurate tracking even with simple greedy linking, thus making strides towards removing the requirement for a complex linking step. The proposed architecture operates on the full spatio-temporal context of detections within a time window by avoiding the computational burden of processing dense images. We show that our tracking approach performs on par with or better than highly tuned state-of-the-art cell tracking algorithms for various biological datasets, such as bacteria, cell cultures and fluorescent particles. We provide code at https://github.com/weigertlab/trackastra.

## Assignment

- Read the paper and use the [Question Sheet](/question-sheet/) which contains a set of questions designed to guide your reading and understanding.
- Fill out your question sheet and submit before the journal club.
- Be ready to discuss in the journal club.

{{< cta cta_text="Click Here to Submit" cta_link="https://forms.gle/vUC9GTfK6a43ervq5" >}}

**Deadline**: Submit your PDF before the journal club session.

If you cannot attend the journal club session, please let the instructor know in advance. And you still need to submit your PDF before the session even if you cannot attend.
 
 ## Join the Journal Club

During the journal club, we will walk through the question sheet together. Everyone will be selected at random to answer one or more questions from the question sheet, and/or describe selected figures.

