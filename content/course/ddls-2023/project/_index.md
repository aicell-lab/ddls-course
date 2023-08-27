---
title: Project Plan
linkTitle: Project Plan
summary: Project plan for the course project.
type: book
date: '2021-10-25'
---
For your projects, select a paper falling under the topic of data-driven life science, which you want to read in details. Identify an interesting knowledge gap that you can address in your project. Note that while it is not crucial that the code is available, you need to be able to retrieve at least the paper's dataset to work with in your project.

This project plan should be maximum 2 pages, and should contain

-   a brief intro to the topic
-   a description of the goals of the paper
-   a description of the main results
-   a description of the data been used
-   a description of the gap you identified (phrased as a question)
-   a plan to address the knowledge gap

For example, if you pick an interesting biological paper that did not do a thorough job at optimizing the analysis protocol, your knowledge gap might be "Would the conclusions of the paper be different if a different analysis method was used?" or "What is the optimal analysis method for this dataset?"

The plan might then go along the lines: We will thoroughly test hyperparameter tuning under different types of cross validation for three classes of methods (linear regression, decision trees and convolutional neural network) to identify the best analysis conditions and report how the results vary with the method and hyperparameter set.

This is of course a nonsensical example, as linear regression and CNNs are not expected to be used for the same dataset: try to make a realistic plan and suggest methods that apparently make sense for the data you want to work with. 

If you pick a paper with a complex neural network pipeline and the code is available, the knowledge gap may be "What is the role of module X, Y and Z in this network?" and your project plan will involve modifying the behavior of these modules and seeing how the results depend on them. If you pick a paper that contains an imbalanced datatset that performs badly at predicting the outcomes for a minority class, your knoweldge gap could be "How can we modify the pipeline to reach better prediction power for this class?" or "How much data would we need to collect in order to reach a prediction accuracy of X% for this class?".