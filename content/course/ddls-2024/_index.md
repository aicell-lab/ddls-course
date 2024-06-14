---
title: "📊 HT2024: Data-driven Life Sciences"
linkTitle: Overview
summary: Course content of the Data-driven Life Sciences course offered in 2024.
date: '2024-05-01'
type: book
tags:
  - current
---

{{< figure src="featured.jpg" >}}

{{< toc hide_on="xl" >}}



Welcome to the Data-driven Life Sciences 2024 course, where you will explore the intersection of data science, artificial intelligence, and life sciences to drive innovation and discovery. This fully online course culminates in an in-person hackathon, fostering a vibrant community that gathers the DDLS and SciLifeLab members.

The 6 modules aim to introduce learners to computer-driven life sciences, covering application areas in data-driven life sciences. Guest lecturers (DDLS Fellows, SciLifeLab fellows, and SciLifeLab facility training providers) will teach topics including technologies and analysis of data sets from proteomics, transcriptomics, biomolecular structure, molecular dynamics simulations, and various imaging techniques. These modules present, analyze, and discuss models of biological phenomena and related scientific breakthroughs based on such data analysis.

The course is open to **all the master's, PhD students and anyone who interested in Sweden**, please use the following link to register:

 {{< cta cta_text="Register Now" cta_link="https://forms.gle/9gmxpEE6X6HZ1wLa7" >}}

You can either register for all the modules or individual modules.

Specifically students at KTH, you should register for the course at the KTH course selection system:
 - [`SK2538` (master's)](https://www.kth.se/student/kurser/kurs/SK2538)
 - [`FSK3538` (PhD)](https://www.kth.se/student/kurser/kurs/FSK3538): PhD student sign up [here](https://forms.gle/9gmxpEE6X6HZ1wLa7).


## Intended Learning Outcomes

-   Describe the field of data-driven life sciences

-   Present an overview of various application areas

-   Provide examples of applications and their associated analysis methods

-   Apply statistical and machine learning analysis to biological data sets

-   Formulate models of biological phenomena

-   Present and review scientific literature in computer-driven life sciences

-   Reflect on the ethical consequences of data-driven life sciences

-   Practice good data management, including collection, handling, sharing, and analysis

## Course Format and Credits

The course consists of 6 modules: a basic module and 5 elective modules. Each module is a stand-alone short-form course with 3 sessions per module. Completing all 6 modules earns a total of 7.5 ECTS.

## Modules and Certification
Each course module contains 3 main activities: a lecture on Tuesday, giving background information about the topic(s) of the week; a computer lab, usually on Wednesday, where you will practically explore data exploration using Python in Jupyter notebooks; and a journal club on Friday where you will collectively explain and discuss an assigned research paper.

Both the computer lab and the journal club are mandatory and graded activities!

- For the labs, you be given a Jupyter notebook with tutorials and coding exercises. You will be running and practicing coding by running the Jupyter notebook in [Google Colab](https://colab.research.google.com/?utm_source=scs-index). During the lab session, you can discuss your answers with the lab teachers. You will submit your final notebook with answers to the questions to be graded.

- For the journal club, you will have a list of questions (the same every week) which we will answer during the journal club. Your participation and answer to these questions will be graded during the journal club.

In addition, in the final project week / hackathon, course participants will decide on a project to be conducted in pairs (Ms students) or alone (PhD students) and followed by an oral presentation. The project and presentation will be graded by peers and the examiner.


You can sign up partially or for the whole course. Each module is worth a certain number of ECTS credits, and you can choose to participate in the modules that interest you most. However, to obtain a certification for participation, you must complete all modules.

Module 1 (basic module) is a prerequisite for obtaining certification for attendance in any of the subsequent elective modules. To receive a certificate, you must:

-   Apply for and participate in Module 1.

-   Actively participate in all registered modules by attending and engaging in all sessions.

You will receive 0.5 ECTS for the basic module and 1 ECTS for each elective module. Completing a final project earns an additional 2 ECTS. For example, if you are a PhD student interested in Module 2, you must complete both Module 1 and Module 2 to receive 0.5 + 1 ECTS. Master's students from KTH or other universities must complete the entire course, including the basic and elective modules, plus the final project.

The first module covers course basics and prerequisites. The subsequent modules each run for a week and cover various topics in data-driven life sciences (DDLS). Each week includes three main activities:

-   One or two 2-hour lectures on Tuesday providing background information about the week's topic(s)

-   A computer lab on Wednesday for practical data exploration using Python in Jupyter notebooks (Google Colab)

-   A seminar on Friday for collective explanation and discussion of an assigned research paper


 {{< cta cta_text="Register Now" cta_link="https://forms.gle/9gmxpEE6X6HZ1wLa7" >}}


You can either register for the full course or selected modules.

## Self-directed Learning

One of the principal objectives of this course is to instill in you a data-driven mindset essential for life science research. More importantly, we aim to teach you the art of "learning how to learn." This involves honing your ability to independently acquire new knowledge and skills. ChatGPT serves as an excellent tool to facilitate this self-directed learning process. Instead of focusing solely on the course content, we encourage you to embrace this broader, skill-centric approach to education. We will use this self-directed learning approach extensively in the computer lab and journal club sessions.


## Course Modules

**Note: The exact content for each module may be subject to change. Please refer to the updated schedule for the most current information.**

{{< 
$children := .Pages
}}
{{ range $children }}
    {{ if (eq .Params.course_module "true") }}
        <div class="child-page">
            <h2><a href="{{ .Permalink }}">{{ .Params.title }}</a></h2>
            <p>{{ .Params.summary }}</p>
        </div>
    {{ end }}
{{ end }}
{{< / >}}

## Grades

The final grade on the course is determined as follows:

-   The computer labs are graded P/F. To pass, you need to attend all the labs and answer the questions to a satisfactory degree.
-   Participation in the seminars is graded as P/F. To pass, you need to read the assigned papers, attend all the seminars and participate in discussions.
-   The project is graded P/F. To pass, you need to carry out the project, and get a passing grade on the project report.
-   The oral exam (project presentation) at the end of course will be graded A-F scale.

-   For master students, the grade on the oral exam determines the final grade on the course provided the other three activities have received a passing grade.
-   For PhD students, the oral exam is not mandatory, but you are welcome to join the oral exam if you want to practice your presentation skills.

The submission of the computer lab, the project report and the oral exam will be first reviewed and graded by your peers, and then the final grade and feedbacks will be given by the teachers and examiner.

## Communication and groups

You can find all announcements at [here](/post/).

For questions, please email the course responsible, see contact [here](/contact/).

## Meet your instructor

In this course, you will meet:
-   {{< mention "wei" >}}, assistant professor in biophysics who will be holding the lectures, seminars and grading them (<weio@kth.se>). Wei is also the course responsible.
-   {{< mention "songtao" >}}, PhD student in biophysics, who will be teaching assistant for the course, chairing lectures, holding the computer labs and journal clubs [songtao.cheng@scilifelab.se)](mailto:songtao.cheng@scilifelab.se)
-   {{< mention "nils" >}}, PhD student in biophysics, who will be teaching assistant for the course, chairing lectures, holding the computer labs and journal clubs(<nils.mechtel@scilifelab.se>)


## Course schedule

See the [course schedule](./schedule/) for the detailed schedule.

## FAQs

{{< spoiler text="Are there prerequisites?" >}}
The students are expected to have basic knowledge of biology and programming in Python. If you are not familiar with Python, it will be helpful if you can go through the [prerequisites](./prerequisites).
{{< /spoiler >}}

{{< spoiler text="How often do the courses run?" >}}
We run the course once a year, in Period 1 from August to October.
{{< /spoiler >}}

{{< spoiler text="How do I register the course?" >}}
-   For KTH master students, please register at the KTH course selection system.
-   For PhD students or anyone from other universities, please sign up at [here](https://forms.gle/9gmxpEE6X6HZ1wLa7).
-   You can also sign up for individual module(s) [here](https://forms.gle/9gmxpEE6X6HZ1wLa7). 
{{< /spoiler >}}

{{< spoiler text="How do I get access to the course material?" >}}
The course material are available at [here](https://ddls.aicell.io). We won't be using KTH Canvas.
{{< /spoiler >}}

{{< spoiler text="Can I attend the course remotely?" >}}

It is possible only for the lectures. Except the first lecture (in person), all other lectures will be given over Zoom (zoom link: https://kth-se.zoom.us/j/69812177998).

The computer labs and seminars are provided in person. Exceptions will be announced in the email and the updated schedule above.
{{< /spoiler >}}

{{< spoiler text="How do I get access to the computer labs?" >}}
The computer labs are normally provided in person (exception may apply, check email announcement and the updated schedule). If you are not able to attend, please contact the course responsible.
{{< /spoiler >}}

{{< spoiler text="How do I get access to the seminars?" >}}
The seminars are normally provided in person (exception may apply, check email announcement and the updated schedule). If you are not able to attend, please contact the course responsible.
{{< /spoiler >}}

{{< spoiler text="What if I cannot attend the computer labs or seminars?" >}}
It is mandatory to attend all the computer labs or seminars, if you anticipate that you will miss a computer lab or seminar, please notify the course responsible as soon as possible, exceptions will be made on a case-by-case basis.

If the exception is granted, you will still need to submit the notebook for the computer lab, or write a report to answer the seminar question sheet.

{{< /spoiler >}}

{{< spoiler text="Will the lecture be recorded?" >}}
The lecture will not be recorded, but the slides will be made available after the lecture.
{{< /spoiler >}}

{{< spoiler text="Can I use ChatGPT / Claude or other generative AI tools in the computer labs, seminar, assignments or the final project?" >}}
Yes, you are encouraged to use these AI tools to facilitate your learning, and perform tasks. However, you need to make sure that you are using them in a responsible way. Importantly, if you used it for submitting any graded activities, please make sure to also attach the exported conversation history with the AI tool.
{{< /spoiler >}}

{{< cta cta_text="Begin the course" cta_link="module-1" >}}
