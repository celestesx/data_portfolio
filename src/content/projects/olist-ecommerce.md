---
title: What actually drives a one-star review?
summary: >-
  A simulated embed with an e-commerce marketplace's operations team. Their ask was "a KPI dashboard";
  the real question was why review scores were slipping. I'm building a tested dbt star schema on
  100k public Olist orders to answer it, and a dashboard the ops lead can check every Monday.
date: 2026-10-01
status: in-progress
draft: false

client: E-commerce ops team (simulated, public Olist dataset)
problem: >-
  "We need a KPI dashboard." After scoping: review scores are dropping and nobody can say whether
  it's delivery, sellers or product categories.
stakeholders:
  - Head of operations (decision owner)
  - Seller success team
  - Finance (revenue definitions)
constraints:
  - Data arrives as nine flat CSV exports, no warehouse
  - Order, payment and review tables use different grains
  - Must be maintainable by an analyst after handover
timeToValue: first dashboard targeted within 2 weeks

pipeline:
  - { stage: source, tool: olist csv }
  - { stage: orchestration, tool: github actions }
  - { stage: warehouse, tool: duckdb }
  - { stage: transformation, tool: dbt }
  - { stage: dashboard, tool: tableau }
stack: [python, sql, dbt, duckdb, github actions, docker, tableau]

handover:
  - README with a one-command local setup (Docker)
  - dbt docs site with column descriptions and lineage
  - Metric definitions agreed with finance, written down in the semantic layer
differently: []
---

## Scoping

The request was a KPI dashboard. Before building anything I wrote down what decision the dashboard
should support. The answer, "which lever do we pull to stop review scores falling", changes what
gets modelled: delivery promise vs actual date, seller, category and freight all need to join
cleanly to the review at the right grain.

## Key modelling decisions

### Grain is the order item, not the order

An order can contain items from several sellers. Modelling at order level would blame every
seller for one late parcel, so the fact table sits at order-item grain and reviews join back
through the order.

### Staging → intermediate → marts

Staging models rename and type the raw CSVs and nothing else. Intermediate models handle the
awkward joins (payments split across instalments, multiple reviews per order). Marts are the
star schema the dashboard reads.

### Tests where the business would get hurt

Uniqueness and not-null tests on every key, plus tests on the assumptions the analysis depends on:
delivered orders must have a delivery date, and review scores must sit between 1 and 5.
