![Node.js](https://img.shields.io/badge/node-%3E%3D22-green)
![TypeScript](https://img.shields.io/badge/typescript-6-blue)
![Tests](https://img.shields.io/badge/tests-node--test-orange)
![License](https://img.shields.io/badge/license-GPL--3.0-red)
![Prisma](https://img.shields.io/badge/prisma-orm-2D3748)
![PostgreSQL](https://img.shields.io/badge/postgresql-16-blue)

# Finance Indicators Project

A Node.js + TypeScript application for collecting, processing and updating financial indicators from multiple data providers.

![Example](./assets/example.png)

The project was designed with:

* fallback providers
* automated tests
* CI pipeline
* Spreadsheet integration
* PostgreSQL persistence
* financial indicators normalization

---

# Features

* Collect stock and FII indicators
* Yahoo Finance integration
* Web scraping fallback providers
* Financial indicators normalization
* Spreadsheet integration
* Prisma ORM + PostgreSQL
* Unit and integration tests
* GitHub Actions automation
* Docker test database
  
---

# Project Overview

The script can retrieve data from the main stock market indicators for the United States and Brazil. In addition, the project is also configured to search for indicators of Brazilian real estate investment trusts (FII).

The script retrieves indicators from multiple providers and stores them in a PostgreSQL database (Supabase by default).

---

# Quick Start

```bash
git clone https://github.com/Alan-Tomaz/finance-indicators-project.git
cd finance-indicators-project

npm install
```

Create `.env` based on `.env.example`.

Unix/macOS:

```bash
cp .env.example .env
```

Windows (CMD):

```cmd
copy .env.example .env
```

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

Generate Prisma client (First, configure the database env variables):

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate deploy
```

Run the project:

```bash
npm run dev
```
---

# Important Notes

Some providers rely on web scraping techniques.

Changes in external websites structure or API behavior may temporarily break indicator collection until parsers are updated. Scraping-based providers are more susceptible to structural changes and anti-bot protections.

# Why this project?

Most free financial APIs either:

- have limited coverage
- provide inconsistent indicators
- restrict requests
- lack Brazilian market support

This project was created to provide:

- unified financial indicators
- multi-provider fallback architecture
- Brazilian and US market support
- spreadsheet-driven workflows
- normalized persistence layer
- automated validation and testing

# Technologies

* Node.js
* TypeScript
* Prisma ORM
* PostgreSQL
* Axios
* Cheerio
* Puppeteer
* Node Test Runner
* Docker
* GitHub Actions

---

# Project Structure

```bash
google-sheets/
prisma/
src/
├── config/
├── constants/
├── db/
├── generated/
├── models/
├── scripts/
├── services/
├── tests/
│   ├── __fixtures__/
│   ├── integration/
│   └── unit/
├── utils/
└── index.ts
```

---

# Environment Variables

Create a `.env` file:

```env
# Database
# YOUR SUPABASE PROJECT PASSWORD
SUPABASE_DB_PASSWORD=
# YOUR SUPABASE PROJECT ID
SUPABASE_DB_ID=
# YOUR SUPABASE PROJECT REGION. EX: us-east-1
SUPABASE_DB_AWS_REGION=

# Spreadsheet
# Your spreadsheet ID. You can get in the spreadsheet url.
SPREADSHEET_ID=
# The columns and rows that will be searched. Expected data in the format: "SHEET!COLUMN:ROW,SHEET!COLUMN:INDEX". Ex: VARIABLE INCOME!B8:D38,VARIABLE INCOME!B72:D83
SPREAD_SHEET_RANGES=

# Google
# YOUR GOOGLE AUTHENTICATION ID
GOOGLE_PROJECT_ID=
# YOUR GOOGLE AUTHENTICATION KEY
GOOGLE_PRIVATE_KEY=
# YOUR GOOGLE AUTHENTICATION EMAIL
GOOGLE_CLIENT_EMAIL=

# The language to filter some data. formats expected: [pt-BR OR en-US]
LANGUAGE=
```

---

# Installation

```bash
npm install
```

---

## Prisma

Generate Prisma client (first configure the database [Creating a Supabase Project](#creating-a-supabase-project)):

```bash
npx prisma generate
```

Run migrations:

```bash
npx prisma migrate deploy
```

---

## Running the Project

Development:

```bash
npm run dev
```

Production:

```bash
npm run build
npm run start
```

---

# CI/CD

The repository contains a GitHub Actions pipeline that:

1. Installs dependencies
2. Generates Prisma client
3. Starts PostgreSQL container
4. Runs migrations
5. Executes tests
6. Builds the project
7. Runs update scripts

---

# Financial Indicators

Examples of supported indicators for stocks:

* P/E
* P/BV
* EV/EBIT
* EV/EBITDA
* Dividend Yield
* ROE
* ROIC
* Net Debt / EBITDA
* Gross Debt / Equity
* CAGR Revenue
* CAGR Profit
* Profit Margin
* Liquidity

---

# Data Providers

## Stocks 

* Yahoo Finance (Primary Provider for US Stocks)

* Investidor10 Website (Primary Provider for BR Stocks)

## FII

* Funds Explorer Website (Primary Provider for FII)

The project merges and normalizes data from multiple providers to improve reliability.

---

# Scraping Strategy

The application uses:

1. Cheerio for lightweight scraping
2. Puppeteer as fallback for anti-bot protected pages

---

# Normalization Strategy

Different providers may expose indicators using:

- different names
- different decimal formats
- missing values
- inconsistent calculations

The normalization layer converts all collected indicators into a unified internal structure before persistence.

---

# Architecture

### Architecture for stocks:

```txt
Google Sheets
      ↓
Ticker Collection
      ↓
Yahoo Finance Provider
      ↓
Fallback Scraping Providers
      ↓
Normalization Layer
      ↓
Validation Layer
      ↓
PostgreSQL Persistence
```

Brazilian stocks primarily use scraping providers.

### Architecture for FIIs:

```txt
Google Sheets
      ↓
Ticker Collection
      ↓
Scraping Providers
      ↓
Normalization Layer
      ↓
Validation Layer
      ↓
PostgreSQL Persistence
```

---

# Result Examples

### STOCK
```ts
{
  assetType: "STOCK",
  ticker: "AAPL",
  date: "04/05/2026",
  name: "Apple Inc",
  sector: "Technology: Communications Equipment",
  price: 308.82,
  pe: 35.65,
  dy: 0.35,
  pbv: 41.04,
  roe: 115.1,
  profitMargin: 26.603,
  roic: 38.39,
  evEbit: 25.37,
  netDebtDivideByEBITDA: null,
  grossDebtNetWorth: null,
  liquidity: 18602319.67,
  cagrProfit: { create: { value: 3.6, periodYears: 5 } },
  cagrRevenue: { create: { value: 4.04, periodYears: 5 } },
}
```

### FI
```ts
{
  assetType: "FII",
  date: "04/05/2026",
  dy: 14.027,
  financialVacancy: null,
  lastDividend: 1.1,
  liquidity: 15449490.32,
  assetsNumber: 14,
  physicalVacancy: null,
  pvp: 1.0194,
  quotaHolders: 549972,
  ticker: "KNCR11",
  vpc: 102.38,
  name: "Kinea Rendimentos Imobiliários",
  price: 105.91,
  fiiType: "Fundo de Papel",
  rentability: { create: { value: 14.34, periodYears: 1 } },
}
```

---

# Google Sheets Data Structure

The script will retrieve data in the following format:

```ts
ITicker {
  ticker: string;
  exchange: string;
  assetType: string;
}
```

Therefore, each range of the `SPREADSHEET_RANGES` environment variable expects to find data positioned in the spreadsheet in this way:


| Symbol | Exchange | Asset Type |
| ----- | ------- | ------ |
| AAPL | NASDAQ | STOCK |
| GOOG | NASDAQ | STOCK |


Visual Example:

![Example 2](./assets/example-2.png)

---

# Google Sheets Integration

The project integrates with Google Sheets to read tickers dynamically.

The integration uses:

* Google Sheets API
* Google Service Account

---

# Enabling Google Sheets API

## 1. Create a Google Cloud Project

Open:

[Google Cloud Console](https://console.cloud.google.com?utm_source=chatgpt.com)

Create a new project.

---

## 2. Enable Google Sheets API

Inside the project:

1. Open:

   * APIs & Services
   * Library

2. Search for:

```txt
Google Sheets API
```

3. Enable the API.

---

## 3. Create Service Account Credentials

Open:

```txt
APIs & Services → Credentials
```

Click:

```txt
Create Credentials → Service Account
```

Fill:

* Service account name
* Description

Finish the creation.

---

## 4. Generate JSON Credentials

Inside the created Service Account:

```txt
Keys → Add Key → Create new key
```

Select:

```txt
JSON
```

A JSON file will be downloaded.

---

## 5. Extract Required Values

From the downloaded JSON file, copy:

```json
{
  "project_id": "",
  "client_email": "",
  "private_key": ""
}
```

---

## 6. Configure Environment Variables

Add the values to `.env`:

```env
GOOGLE_PROJECT_ID=
GOOGLE_PRIVATE_KEY=
GOOGLE_CLIENT_EMAIL=
```

IMPORTANT:

The private key must preserve line breaks.

Example:

```env
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nABC123...\n-----END PRIVATE KEY-----\n"
```

---

## 7. Share Spreadsheet Access

Open your spreadsheet.

Click:

```txt
Share
```

Add the service account email:

```txt
example-project@project-id.iam.gserviceaccount.com
```

Grant:

* Viewer permission

Without this step the API will return permission errors.

---

## Spreadsheet ID

The Spreadsheet ID is the value in the URL:

Example:

```txt
https://docs.google.com/spreadsheets/d/1ABCDEF123456/edit
```

Spreadsheet ID:

```txt
1ABCDEF123456
```

Add to `.env`:

```env
SPREADSHEET_ID=
```

---

## Spreadsheet Ranges

Example range:

```env
SPREAD_SHEET_RANGES=Stocks!A2:A100
```

You can also use multiple ranges depending on your implementation.

---

## Example Authentication

```ts
import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    project_id: process.env.GOOGLE_PROJECT_ID,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
});

const sheets = google.sheets({
  version: "v4",
  auth,
});
```

---

## Example Read Operation

```ts
const response = await sheets.spreadsheets.values.get({
  spreadsheetId: process.env.SPREADSHEET_ID,
  range: "Stocks!A2:A100",
});

console.log(response.data.values);
```

---

## Common Errors

### Permission denied

Cause:

* Spreadsheet not shared with service account

---

### Invalid private key

Cause:

* Missing `\n` replacement

Correct:

```ts
private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n")
```

---

### API not enabled

Cause:

* Google Sheets API disabled in Google Cloud Console

---

# Supabase Configuration

The project uses [Supabase](https://supabase.com?utm_source=chatgpt.com) as the PostgreSQL database provider.

Prisma ORM is used to manage database access and migrations.

---

# Creating a Supabase Project

## 1. Create an Account

Open:

[Supabase Dashboard](https://app.supabase.com?utm_source=chatgpt.com)

Create an account and log in.

---

## 2. Create a New Project

Click:

```txt
New Project
```

Fill:

* Organization
* Project Name
* Database Password
* Region

Wait for the database provisioning process.

---

## 3. Obtain Database Credentials

Inside the project dashboard:

```txt
Project Settings → Database
```

Locate:

* Host
* Port
* Database name
* User
* Password

---

## 4. Configure Environment Variables

Create `.env`:

```env
SUPABASE_DB_PASSWORD=
SUPABASE_DB_ID=
SUPABASE_DB_AWS_REGION=
```

---

## 5. Build Database URL


Example:

```ts
const DATABASE_URL =
  `postgresql://postgres.${SUPABASE_DB_ID}:${SUPABASE_DB_PASSWORD}@aws-1-${SUPABASE_DB_AWS_REGION}.pooler.supabase.com:5432/postgres`;
```

---

### Generate Prisma Client

```bash
npx prisma generate
```

---

### Running Migrations

Development:

```bash 
npx prisma migrate dev
```

Production / CI:

```bash
npx prisma migrate deploy
```

---

### Opening Prisma Studio

```bash
npx prisma studio
```

---

# Common Errors

## P1001 - Database connection failed

Cause:

* Wrong host
* Supabase paused
* Invalid credentials

---

## P1000 - Authentication failed

Cause:

* Wrong password

---

## Prisma Client Initialization Error

Cause:

* `DATABASE_URL` missing

---

## Migration Errors

Cause:

* Database schema mismatch
* Missing migrations

Fix:

```bash
npx prisma migrate deploy
```

---

## Recommended Architecture

```txt
Production:
Supabase PostgreSQL

Development:
Supabase or local PostgreSQL

Tests:
Docker PostgreSQL container
```

## Tables

### `StockIndicators`
```ts
StockIndicatorsCreateInput = {
  assetType?: string | null
  ticker: string
  date: string
  name?: string | null
  sector?: string | null
  price?: number | null
  pe?: number | null
  pbv?: number | null
  dy?: number | null
  roe?: number | null
  roic?: number | null
  profitMargin?: number | null
  evEbit?: number | null
  netDebtDivideByEBITDA?: number | null
  grossDebtNetWorth?:number | null
  liquidity?: number | null
  createdAt?: Date | null
  updatedAt?: Date | null
  cagrRevenue?: {
    periodYears: number | null,
    value: number | null
  }
  cagrProfit?: {
    periodYears: number | null,
    value: number | null
  }
}
```

### `FiiIndicators`
```ts
{
  assetType?: string | null
  ticker: string
  date: string
  name?: string | null
  price: number 
  pvp?: number | null
  vpc?: number | null
  dy?: number | null
  liquidity?: number  | null
  assetsNumber?: number | null
  financialVacancy?:  number  | null
  physicalVacancy?:  number  | null
  lastDividend?:  number  | null
  quotaHolders?:  number  | null
  fiiType?: string | null
  createdAt?: Date 
  updatedAt?: Date 
  rentability?: {
    periodYears: number | null,
    value: number | null
  }
}
```

---

# Tests

## Unit Tests

Used for:

* calculations
* normalization
* edge cases
* undefined handling

## Integration Tests

Used for:

* Prisma operations
* spreadsheet integration
* provider requests
* scraping validation

---

# Fixtures

HTML fixtures are stored locally to:

* avoid external dependencies
* improve test speed
* simulate edge cases

# Testing Database

The project uses a dedicated PostgreSQL container for tests.

Example `docker-compose.test.yml`:

```yaml
services:
  postgres:
    image: postgres:16
    container_name: postgres-test
    environment:
      POSTGRES_USER: admin
      POSTGRES_PASSWORD: 12345678
      POSTGRES_DB: test
    ports:
      - "5432:5432"
```

---

# Running Tests

```bash id="n9t0zy"
npm run test
```

By default, the `npm run test` command will use the database URL pointing to the test PostgreSQL database.

Example test environment:

```env id="v8q1mr"
SUPABASE_DB_URL=postgresql://admin:12345678@localhost:5432/test
```

---

# GitHub Actions

The GitHub Actions pipeline ensures the script runs every day at 10 AM UTC. It will automatically retrieve the indicators for the tickers configured in the .env file and subsequently save them to the configured database (default Supabase).

## Secrets

```yml
env:
    # SUPABASE
    SUPABASE_DB_PASSWORD: ${{ secrets.SUPABASE_DB_PASSWORD }}
    SUPABASE_DB_ID: ${{ secrets.SUPABASE_DB_ID }}
    SUPABASE_DB_AWS_REGION: ${{ secrets.SUPABASE_DB_AWS_REGION }}
    # SPREADSHEET
    SPREADSHEET_ID: ${{ secrets.SPREADSHEET_ID }}
    SPREADSHEET_RANGES: ${{ secrets.SPREADSHEET_RANGES }}
    # GOOGLE
    GOOGLE_PROJECT_ID: ${{ secrets.GOOGLE_PROJECT_ID }}
    GOOGLE_PRIVATE_KEY: ${{ secrets.GOOGLE_PRIVATE_KEY }}
    GOOGLE_CLIENT_EMAIL: ${{ secrets.GOOGLE_CLIENT_EMAIL }}
    # OTHERS
    LANGUAGE: ${{ secrets.LANGUAGE }}
```

Add the variables from the .env file to the repository's secrets so that the .yml pipeline works.

Open:

```txt id="n7x4w6"
Repository → Settings → Secrets and variables → Actions
```

## Example

```yaml
steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Install Node.js
        uses: actions/setup-node@v4
        with:
          node-version: "22"

      - name: Install Dependencies
        run: npm install

      - name: Generate Prisma Client
        run: npx prisma generate

      - name: Start PostgreSQL container for tests
        run: docker compose -f docker-compose.test.yml up -d

      - name: Wait for PostgreSQL
        run: |
          until [ "$(docker inspect -f {{.State.Health.Status}} $(docker compose -f docker-compose.test.yml ps -q postgres-test))" = "healthy" ]; do
          echo "Waiting for postgres..."
          sleep 2
          done

      - name: Test Code
        run: npm run test

      - name: Run update script
        run: |
          npm run build
          npm run start
```

---

# Google Apps Script

In path `google-sheets\searchIndicators.js` you can find an example of an Apps Script (Google Sheets Script) to retrieve indicator data from the supabase and update the fields in your spreadsheet with it.

---

# Security Recommendations

* Never expose database credentials
* Use GitHub Secrets in CI/CD pipelines
* Prefer read-only spreadsheet permissions when possible
* Avoid using the production database in automated tests
* Use separate databases for:
  * production
  * development
  * tests

---

# Contributing

Pull requests are welcome.

Before submitting changes:

```bash
npm run test
```

Please ensure:
- tests pass
- code is formatted
- new providers include tests when possible

---

# License

GNU General Public License v3.0