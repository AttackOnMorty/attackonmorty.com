---
title: How to Read Source Code
date: '2025-02-08'
spoiler: 'To understand a program you must become both the machine and the program.'
---

> To understand a program you must become both the machine and the program.

---

- [Prerequisites](#prerequisites)
- [Understanding Code Components](#understanding-code-components)
- [Summary](#summary)

---

## Prerequisites

Before diving into the code, you should be familiar with the following:

1. **Fundamental Knowledge** – Understanding the relevant programming language and foundational technologies.
2. **Understanding the Software Functionality** – You should first understand what the software does, its features, and configuration options. Read the user manual, get the software running, and use it to get a firsthand experience.
3. **Related Documentation** – Read any available internal documentation, README files, release notes, design documents, or wiki pages. These can provide insights into the software.
4. **Code Organization Structure** – Understand the purpose of each directory and file in the codebase. If the program follows a standard framework, reading the code becomes much easier.

## Understanding Code Components

Next, you need to understand the different parts that make up the software. Here is a reference list:

1. **Interface and Abstract Definitions** – Every codebase contains numerous interfaces and abstractions that define data structures or business entities and their relationships. Understanding these relationships is crucial.
2. **Glue Code (Middleware and Intermediary Layers)** – Many parts of the code exist to connect modules, such as middleware, Promises patterns, callbacks, proxy delegation, and dependency injection. These intermediary layers can break down straightforward code into fragmented pieces, making it harder to comprehend.
3. **Business Process Flow** – This refers to the overall execution flow of the program. Initially, avoid getting caught in details; instead, understand the high-level business flow and how data is passed and processed. Drawing flowcharts or sequence diagrams is usually helpful.
4. **Implementation Details** – Once you have a good grasp of the above three aspects, you can dive into the specifics of the implementation. Here are some key factors:

   - **Code Logic** – There are two types of logic: business logic (actual data processing) and control logic (managing program flow, e.g., flags, multithreading, asynchronous operations, remote communication, serialization/deserialization). Mixing these two types can create confusion, so it's important to differentiate them.
   - **Error Handling** – According to the [80/20 rule](https://en.wikipedia.org/wiki/Pareto_principle), 20% of the code deals with normal logic, while 80% handles various errors. When reading code, you can initially ignore the error-handling sections to focus on the core logic.
   - **Data Processing** – A significant portion of code revolves around data transformation, such as DTO, JSON, and XML parsing. These tend to be verbose and secondary to the main logic, so you may choose to skim over them.
   - **Important Algorithms** – These do not necessarily mean sorting or searching algorithms but could include indexing strategies, globally unique ID generation, recommendation algorithms, statistical computations, and distributed algorithms. These are often the most technically challenging but also the most valuable parts of the code.
   - **Low-Level Interactions** – Some code interacts with the underlying system, such as the operating system. Reading such code often requires knowledge of low-level system programming.

5. **Runtime Debugging** – Often, you can only truly understand what the code does when it is running. Use logs, set breakpoints, and debug to observe how the code executes in real-time.

## Summary

- Generally, use a **top-down approach**, starting from an overview and gradually diving into details, like peeling an onion.
- **Diagrams are essential** – Draw flowcharts, sequence diagrams, and module organization diagrams.
- **Categorize code logic** – Separate concerns to remove noise and highlight the main logic.
- **Debugging is the best way to understand execution** – Track execution to see what happens in real-time.
