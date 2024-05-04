# Keep Track - Overview

## Introduction

This is an automation I intend to prove helps keep track of less urgent to-do list items that need to be visible and recorded somewhere that will remind users about daily so that they are attended to regularly.

## Purpose

This is a habit tracker that helps you to achieve stretch goals by providing the tasks that you enter in a notififcation brought to your in box directly if immediate action is needed. It is an accountability notification system that allows users to be reminded about the tasks that have not been completed or need to be updated in the sheet.

``` mermaid
    graph TD;
    A((Start)) --> B[Open Google Sheets]
    B --> C[Get 'To-Do List' Sheet]
    C --> D[Get Sheet Data]
    D --> E[Iterate Over Rows]
    E --> F[Check Due Date]
    F --> |Overdue| G[Add Task Details to Output]
    F --> |Not Overdue| H[Skip Task]
    G --> I[Send Email]
    H --> I
    I --> J((End))
```

## Results

How will results be quantified? Generally tasks currently are tracking to take 2 weeks or more to get around to being completed. Before implementing this project, this will be used as the base timeframe for getting tasks completed in time.
Will tasks be completed faster than 2 weeks? Will tasks be broken down into better descriptive actions that need to be taken?

## Conclusion

This app is successful in allowing the user to take control of what tasks can be completed when users have 5 minutes or more & using the reminder system, allows users to check-in daily as needed to update the app with more precise information to update their inbox centrally.
