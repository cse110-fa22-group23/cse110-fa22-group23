# Architecture Design Record - Responsive Table Styling

> Last updated Dec. 2, 2022

## Context and Problem Statement

How do we plan on addressing potential need for responsive table styling and current table layout messiness?

## Considered Options

* Adopt table responsiveness, allowing for the table to resize according to current screen dimensions, and preventing it from overflowing past current screen dimensions
* Keep styling as is

## Decision Outcome

Chosen option: **Keep styling as is**

### Consequences

* Good, because no need to consider possible ramifications of modifications to current styling
* Good, because no possibility of maladjusted styling at small screen sizes
* Good, because extra work will not be needed to update and bug fix any changes
* Good, provides simpler code complexity
* Bad, because table styling will be messy and look worse on screens where overflow occurs

## Pros and Cons of Other Options

### Responsive styling

* Good, because UI will be cleaner, at least for screens that can fit the table appropriately
* Good, potentially more scalable/better long term if we could address some of its limitations
* Bad, because more dev costs in time and maintenance
* Bad, because table styling has fundamental limitations for resizing at small enough sizes


## More Information

As is, the table may overflow past screen width.  Although it makes for a messy UI under some circumstances, the screen sizes at which it does not fit appropriately are small enough that the table would already be malformed anyways.  Thus it seems more appropriate to leave table styling as is.