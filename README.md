# wizard-tdd-workshop

ウィザード形式の申し込みシステムで学ぶ TDD / E2E / CI 研修用リポジトリ。

レガシー構成からモダン構成へ段階的に移行する過程を PR で追体験できます。

## サンプルアプリ

4ステップのウィザード形式で申し込みを行うWebアプリケーション。

1. **Step 1**: 個人情報の入力（氏名・メール・電話番号）
2. **Step 2**: プランの選択
3. **Step 3**: 入力内容の確認
4. **Step 4**: 申し込み完了

- Step 1〜3: `sessionStorage` でデータを保持
- Step 4 (完了時): API でバックエンドに保存

## 技術スタック

| 領域 | 技術 |
|------|------|
| フロントエンド | React 19 + TypeScript + Vite + MUI v6 |
| バックエンド | Spring Boot 3.x + Java 21 + Gradle |
| データベース | PostgreSQL 16 (docker compose) |
| E2E テスト | Playwright |
| 受け入れテスト | Cucumber (Gherkin) + Playwright |
| FE ユニットテスト | Vitest + Testing Library |
| BE 統合テスト | JUnit 5 + Testcontainers |
| CI | GitHub Actions |
| 品質 | ESLint + Prettier + husky + lint-staged |

## PR 一覧（段階的な移行ステップ）

各 PR の diff を見ることで、レガシー → モダンの変更内容を確認できます。

| # | PR | 内容 |
|---|-----|------|
| 1 | [01: レガシー構成でウィザードアプリを実装](../../pull/1) | React 17 (JS) + Spring Boot 2.7 (Maven) でレガシーアプリ構築 |
| 2 | [02: モノレポ + 環境整備](../../pull/2) | pnpm workspace + docker compose + Makefile |
| 3 | [03: FE モダン化](../../pull/3) | TypeScript + Vite + React Router v7 + MUI |
| 4 | [04: BE モダン化](../../pull/4) | Gradle + Spring Boot 3 + OpenAPI |
| 5 | [05: E2E テスト](../../pull/5) | Playwright でハッピーパス + バリデーションテスト |
| 6 | [06: ユニットテスト](../../pull/6) | Vitest + Testing Library + Testcontainers |
| 7 | [07: Gherkin/ATDD](../../pull/7) | Cucumber で自然言語の受け入れテスト |
| 8 | [08: CI + 品質](../../pull/8) | GitHub Actions + ESLint + Prettier + husky |

## クイックスタート

```bash
# DB を起動
make db

# バックエンドを起動
make backend

# フロントエンドを起動
make frontend

# または全て一括で起動
make dev

# テスト実行
make test        # FE + BE ユニットテスト
make e2e         # E2E テスト

# 停止
make stop
```
