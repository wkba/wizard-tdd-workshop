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

## 前提条件のインストール（Mac）

以下のツールが必要です。未インストールの場合は順番にインストールしてください。

### 1. Homebrew（パッケージマネージャ）

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

### 2. Docker Desktop

```bash
brew install --cask docker
```

インストール後、Docker Desktop アプリを起動してください。メニューバーにクジラのアイコンが表示されたら準備完了です。

### 3. Node.js + pnpm

```bash
brew install node
corepack enable
corepack prepare pnpm@latest --activate
```

確認:

```bash
node -v   # v22.x.x
pnpm -v   # 9.x.x
```

### 4. Java 21

```bash
brew install openjdk@21
```

シェルの設定ファイル（`~/.zshrc`）に以下を追加:

```bash
export JAVA_HOME=$(/usr/libexec/java_home -v 21)
export PATH="$JAVA_HOME/bin:$PATH"
```

追加後、ターミナルを再起動するか `source ~/.zshrc` を実行してください。

確認:

```bash
java -version   # openjdk 21.x.x
```

### 5. Gradle

```bash
brew install gradle
```

## セットアップ

```bash
# リポジトリをクローン
git clone https://github.com/wkba/wizard-tdd-workshop.git
cd wizard-tdd-workshop

# 依存のインストール + Gradle Wrapper 生成 + Playwright ブラウザダウンロード
make setup
```

## 起動

```bash
# 全サービスを一括起動（DB + バックエンド + フロントエンド）
make dev
```

起動後、ブラウザで以下にアクセス:

| サービス | URL |
|---------|-----|
| フロントエンド | http://localhost:3000 |
| バックエンド API | http://localhost:8080/api/applications |
| Swagger UI | http://localhost:8080/swagger-ui/index.html |
| PostgreSQL | localhost:5432 (user: wizard / pass: wizard) |

個別に起動する場合:

```bash
make db        # PostgreSQL のみ起動
make backend   # バックエンドのみ起動
make frontend  # フロントエンドのみ起動
```

## テスト

```bash
make test          # FE + BE ユニットテスト
make test-frontend # FE のみ
make test-backend  # BE のみ（Testcontainers で PostgreSQL が自動起動）
make e2e           # E2E テスト（事前に make dev で起動が必要）
```

## 停止・クリーン

```bash
make stop    # 全サービスを停止
make clean   # 停止 + DB データ・node_modules・ビルド成果物を全削除
make status  # 実行中のサービスを確認
```

## コマンド一覧

```bash
make help   # 利用可能なコマンドを表示
```

## トラブルシューティング

### `make backend` で「JAVA_HOME is not set」と出る

Java 21 がインストールされているか確認してください:

```bash
java -version
```

表示されない場合は「前提条件のインストール」の Java 21 の手順を実行してください。

### `make db` で「Cannot connect to the Docker daemon」と出る

Docker Desktop が起動していません。アプリケーションから Docker Desktop を起動してください。

### ポートが既に使われている

```bash
make status   # 使用中のポートを確認
make stop     # サービスを停止
```

それでも解消しない場合:

```bash
lsof -i :3000  # 3000番ポートを使っているプロセスを確認
kill <PID>      # プロセスを停止
```

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
