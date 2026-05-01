.PHONY: dev stop clean db frontend backend e2e test test-frontend test-backend status setup

# ---------- セットアップ ----------

setup: ## 初回セットアップ（依存インストール + Playwright ブラウザ + Gradle Wrapper）
	pnpm install
	cd e2e && pnpm exec playwright install --with-deps chromium
	cd backend && gradle wrapper --gradle-version 8.12

# ---------- 起動 ----------

dev: db backend frontend ## 全サービスを一括起動

db: ## PostgreSQL を起動
	docker compose up -d

frontend: ## フロントエンド (Vite) を起動
	cd frontend && pnpm install --frozen-lockfile 2>/dev/null || cd frontend && pnpm install
	cd frontend && pnpm dev &

backend: ## バックエンド (Spring Boot) を起動
	cd backend && ./gradlew bootRun &

# ---------- テスト ----------

test-frontend: ## FE ユニットテスト
	pnpm --filter wizard-frontend test

test-backend: ## BE 統合テスト (Testcontainers)
	cd backend && ./gradlew test

e2e: ## E2E テスト (Playwright)
	pnpm --filter wizard-e2e test

test: test-frontend test-backend ## FE + BE テスト

# ---------- 停止・クリーン ----------

stop: ## 全サービスを停止
	-pkill -f "vite" 2>/dev/null
	-pkill -f "bootRun" 2>/dev/null
	docker compose down

clean: stop ## 停止 + データ・成果物を全削除
	docker compose down -v
	rm -rf frontend/node_modules frontend/dist
	rm -rf backend/build backend/.gradle
	rm -rf e2e/node_modules
	rm -rf node_modules

status: ## 実行中のサービスを確認
	@echo "=== Docker ==="
	@docker compose ps
	@echo ""
	@echo "=== Ports ==="
	@lsof -i :3000 -i :5432 -i :8080 2>/dev/null | grep LISTEN || echo "No services running"

help: ## コマンド一覧を表示
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-16s\033[0m %s\n", $$1, $$2}'
