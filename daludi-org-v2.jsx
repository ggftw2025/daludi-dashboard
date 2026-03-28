import { useState } from "react";

// ─── DATA ───────────────────────────────────────────────────────
const ROLES = [
  {
    id: "ceo",
    title: "CEO",
    sub: "妙珊",
    color: "#1a1a2e",
    accent: "#e8c547",
    isPrimary: true,
    nodes: [
      { text: "策略規劃 & 年度目標設定", ai: true, when: "Q1 全年" },
      { text: "大客戶關係維護（設計師/飯店/工程商）", ai: false },
      { text: "IT 系統架構主導（正航ERP / Shopify / Make）", ai: true, when: "Q2-Q3" },
      { text: "【新】印尼官網開發 & 外銷業務拓展", ai: true, when: "Q3-Q4" },
      { text: "【新】ToC柚木新產品設計規劃", ai: true, when: "Q2-Q3" },
      { text: "BNI 北部展覽出席（設計師開發）", ai: false },
      { text: "各部門 KPI 審核 & 月度 review", ai: true, when: "每月" },
      { text: "人事決策（招募 / 考核 / 薪資框架）", ai: true, when: "Q1-Q2" },
      { text: "交接錄音 → 轉譯 → 流程文件化（財務/運營）", ai: true, when: "Q1 緊急" },
      { text: "用Claude/Cowork減少行政人員依賴", ai: true, when: "全年持續" },
      { text: "【新】內部產品中台系統規劃（業務查庫存/雙價格/在途貨/薪資模組）", ai: true, when: "Q2-Q3" },
    ],
    projects: [
      "▸ 2026目標：台灣現金流3M/月",
      "▸ 5月台北展間開幕",
      "▸ 年底導入正航ERP",
      "▸ ToC目標：年底100萬（爸爸IP漏斗）",
      "▸ 印尼官網 & 外銷：Q3-Q4啟動",
      "▸ 柚木新產品設計：ToC導向",
      "▸ 【新】內部產品中台App（業務手機查詢+倉管掃點+薪資計算）",
    ],
    systems: ["Claude AI", "Notion", "Shopify後台", "LINE"],
  },
  {
    id: "finance",
    title: "財務",
    sub: "（新人到職中）",
    color: "#0d2137",
    accent: "#4fc3f7",
    nodes: [
      { text: "日常對帳（收/付款核對）", ai: false },
      { text: "發票開立與管理", ai: false },
      { text: "現金流日報 → 週報（目前手寫 → 電子化）", ai: true, when: "到職即啟動" },
      { text: "薪資計算 & 勞健保申報", ai: false },
      { text: "稅務申報配合（營業稅/所得稅）", ai: false },
      { text: "廣告投資效益計算（ROAS / 轉換率）", ai: true, when: "Q1-Q2 核心任務" },
      { text: "Notion CRM → Make → 數據萃取 → 廣告效益報表", ai: true, when: "Q2" },
      { text: "【新】產品資料庫工具：點選產品+數量 → 自動產出Word/Excel（給貨代/報關行）", ai: true, when: "Q2 建置" },
      { text: "正航ERP上線主導（年底）", ai: true, when: "Q3-Q4" },
      { text: "現有ERP高格亞翼 → 資料遷移規劃", ai: true, when: "Q2" },
      { text: "客戶應收帳款追蹤（尾款催收）", ai: true, when: "到職後" },
      { text: "銀行帳戶餘額看板（多帳戶一目瞭然）", ai: true, when: "Q1 建置" },
      { text: "內外帳整合 → 單一帳合規化（漸進式）", ai: true, when: "Q2-Q3" },
    ],
    projects: [
      "▸ 最痛點：廣告費投下去但算不出轉換率/ROAS → 修復數據架構",
      "▸ 最痛點：產品資料手打（布號/規格/圖片）→ 產品資料庫自動化",
      "▸ 交接錄音轉譯 → Claude整理財務SOP",
      "▸ 4/7 正航ERP廠商會議（Shopify串接/API評估）",
      "▸ 年底：正航ERP上線",
    ],
    systems: ["高格亞翼 Pilot ERP（現）", "正航ERP（年底）", "網路銀行", "Notion CRM", "Make.com"],
    autoTargets: ["ROAS自動計算報表", "產品資料→自動產出貨代文件", "銀行餘額看板", "應收逾期預警"],
  },
  {
    id: "ops",
    title: "營運特助",
    sub: "（新人到職中）",
    color: "#0a2620",
    accent: "#81c784",
    nodes: [
      { text: "【今年首要】舊庫存清空 + 新庫存入倉位置正確化", ai: true, when: "Q1 最優先" },
      { text: "貨櫃進度追蹤系統：幾月幾號到、裡面有什麼產品", ai: true, when: "Q1-Q2 建置" },
      { text: "B2B/B2C工作流程拆分（高優先）", ai: true, when: "Q1 緊急" },
      { text: "採購詢價 & 下單（印尼/中國/台灣供應商）", ai: false },
      { text: "進銷存管理 & 安全庫存監控", ai: false },
      { text: "請假系統數位化（紙本→Google Form）", ai: true, when: "Q1 快速完成" },
      { text: "供應商關係維護（6大類）", ai: false },
      { text: "5月台北展間開幕協調", ai: true, when: "Q2" },
      { text: "客戶下單 → 出貨全流程SOP建立", ai: true, when: "Q1-Q2" },
      { text: "師傅團隊工單管理", ai: true, when: "Q2" },
      { text: "印尼貨櫃週期優化（現雙月小櫃積壓）", ai: true, when: "Q2-Q3" },
    ],
    projects: [
      "▸ 【最重要】倉庫大整理：舊存清空、新存定位",
      "▸ 貨櫃追蹤工具（Apps Sheet → 可視化看板）",
      "▸ B2B/B2C工作流程拆分（最高優先）",
      "▸ 請假系統一天內搞定",
      "▸ 印尼庫存週期問題：雙月小櫃積壓現金 → 優化節奏",
    ],
    systems: ["高格亞翼 Pilot / 正航ERP", "Notion", "Google Form", "LINE"],
    autoTargets: ["低庫存自動通知採購", "Shopify庫存同步", "請假自動通知CEO", "貨櫃抵台自動提醒"],
  },
  {
    id: "marketing",
    title: "行銷",
    sub: "（1人）",
    color: "#1f0a2e",
    accent: "#f48fb1",
    nodes: [
      { text: "【核心1】線下活動整體運營（展覽/開幕/設計師活動）", ai: true, when: "5月展間開幕" },
      { text: "【核心2】ToB設計師電子報：增加訂閱人數", ai: true, when: "Q1-Q2 每週執行" },
      { text: "【核心3】ToC漏斗：爸爸IP + 廣告投放 → 目標年底100萬", ai: true, when: "Q2啟動" },
      { text: "ToC廣告：與數據投放/引流團隊合作擴大影響力", ai: false },
      { text: "ToC業務助理招聘（待量起來後1-2人）", ai: false },
      { text: "商業案例 → 三版文案（IG/電子報/設計師版）", ai: true, when: "每有新案例" },
      { text: "大綠地小精靈Chatbot維護（Shopify/Facebook）", ai: true, when: "持續" },
      { text: "B2B客戶名單池管理（設計師/景觀師分群）", ai: true, when: "Q1建架構" },
      { text: "大綠地好友計劃（轉介獎勵）", ai: true, when: "Q2啟動" },
      { text: "LINE@ B2B/B2C分群推播策略", ai: true, when: "到位後建立" },
      { text: "Meta/Google廣告投放 & ROAS追蹤", ai: false },
    ],
    projects: [
      "▸ 【核心任務1】5月台北展間開幕（邀請制設計師活動）",
      "▸ 【核心任務2】ToB電子報4期（每期主打1個商業能力）",
      "▸ 【核心任務3】爸爸IP × ToC漏斗 → 年底100萬目標",
      "▸ ToC 100萬達成後 → 招1-2個業務助理",
      "▸ Prompt工具包（降低行銷AI使用門檻）",
    ],
    systems: ["Shopify", "Meta Ads", "Canva", "Claude AI", "Mailchimp"],
    autoTargets: ["案例→三版文案自動化", "電子報框架產出", "ToC廣告數據自動報表"],
  },
  {
    id: "sales",
    title: "銷售團隊",
    sub: "B2B為主（2人+CEO）",
    color: "#1a1000",
    accent: "#ffb74d",
    nodes: [
      { text: "設計師 / 景觀師 / 工程商開發", ai: false },
      { text: "客戶需求訪談 & 空間方案提案", ai: true, when: "提案前" },
      { text: "報價單製作（ERP報價模組）", ai: false },
      { text: "Notion CRM 客戶狀態維護", ai: false },
      { text: "日報填寫（接單/詢價/回訪KPI）", ai: false },
      { text: "舊客回訪（每週10筆）& 新客開發（每週3筆）", ai: false },
      { text: "來店 & 展覽接待", ai: false },
      { text: "ROAS數據回填（渠道來源標記）", ai: false },
      { text: "訂單確認 → 轉倉儲出貨", ai: false },
      { text: "【新】手機查詢：產品庫存/在途貨/預計到貨日/ToB+ToC雙價格", ai: true, when: "Q2-Q3" },
      { text: "業務薪資：毛利提成 + 特價品2%額外獎金", ai: true, when: "Q2計算模組" },
    ],
    projects: [
      "▸ B2B轉型：讓設計師知道「商業沙發/整體空間解決方案」",
      "▸ 北台灣北部設計師開發（BNI/展覽）",
      "▸ 大綠地好友計劃（轉介獎勵）",
      "▸ 5月台北展間：設計師精準邀請名單",
      "▸ ToC業務：待客戶數增加後啟動",
    ],
    systems: ["ERP報價模組", "Notion CRM", "LINE", "大綠地業務日報Excel"],
    autoTargets: ["報價單自動產出", "跟進提醒自動化", "轉介計畫通知"],
  },
  {
    id: "warehouse",
    title: "倉儲出貨",
    sub: "Abby",
    color: "#0a1f0a",
    accent: "#a5d6a7",
    nodes: [
      { text: "進貨驗收 & 上架（品質確認）", ai: false },
      { text: "出貨揀貨 & 包裝", ai: false },
      { text: "庫存盤點（定期）", ai: false },
      { text: "ERP庫存數量更新", ai: false },
      { text: "瑕疵品記錄 & 回報", ai: false },
      { text: "退換貨處理", ai: false },
      { text: "物流廠商溝通 & 排程（ToC出貨尤其複雜）", ai: false },
      { text: "【新】手機掃點：進出倉確認、倉位管理", ai: true, when: "Q2-Q3" },
    ],
    projects: [
      "▸ ToC出貨量增加後：出貨調度將大幅增加複雜度",
      "▸ 進銷存自動同步後：ERP手動更新需求減少",
      "▸ 出貨前照片存證SOP建立",
    ],
    systems: ["高格亞翼 Pilot / 正航ERP", "物流系統", "LINE"],
    autoTargets: ["庫存差異自動警示", "出貨前照片自動歸檔"],
  },
  {
    id: "masters",
    title: "師傅團隊",
    sub: "安裝 & 維修",
    color: "#1c0a1c",
    accent: "#ce93d8",
    nodes: [
      { text: "現場安裝執行", ai: false },
      { text: "安裝前場地確認", ai: false },
      { text: "維修保養服務", ai: false },
      { text: "安裝完工回報 & 客戶簽收", ai: false },
      { text: "現場問題記錄（含照片）", ai: false },
    ],
    projects: [
      "▸ 電子工單：從紙本LINE改為表單回報",
      "▸ 完工照片自動歸入案例資料庫",
    ],
    systems: ["LINE", "紙本工單（→電子化）"],
    autoTargets: ["電子工單", "完工照片自動歸檔"],
  },
];

// Timeline phases for Claude cowork
const TIMELINE = [
  {
    phase: "Q1 緊急（現在-4月）",
    color: "#e53935",
    tasks: [
      "CEO：交接錄音轉譯 → Claude整理財務/運營SOP",
      "財務：現金流日報中繼工作台建立",
      "運營：B2B/B2C工作流程拆分",
      "運營：請假系統數位化（Google Form）",
      "行銷：B2B電子報第1-2期",
      "行銷：Prompt工具包建立",
    ],
  },
  {
    phase: "Q2 建置（5-7月）",
    color: "#f57c00",
    tasks: [
      "財務：內外帳整合啟動 & 應收應付看板",
      "運營：進銷存 × Shopify 自動同步（Make）",
      "運營：5月台北展間開幕協調",
      "行銷：好友計劃啟動 & 客戶名單池架構",
      "CEO：4/7 正航ERP廠商評估",
    ],
  },
  {
    phase: "Q3 深化（8-9月）",
    color: "#388e3c",
    tasks: [
      "財務：正航ERP上線前準備（資料遷移）",
      "全員：各部門SOP文件完整化",
      "行銷：ROAS看板自動化完成",
      "運營：師傅電子工單系統",
      "CEO：印尼市場評估 & 初步拜訪",
    ],
  },
  {
    phase: "Q4 收割（10-12月）",
    color: "#1565c0",
    tasks: [
      "財務：正航ERP正式上線",
      "全員：系統切換 & 穩定化",
      "CEO：2027計畫制定（中國布套工作室/印尼）",
      "行銷：年度報告 & 2027行銷策略",
    ],
  },
];

// ─── COMPONENTS ────────────────────────────────────────────────
function Tag({ text, color, bg }) {
  return (
    <span style={{
      display: "inline-block",
      background: bg || "#f0f0f0",
      color: color || "#555",
      border: `1px solid ${color || "#ddd"}`,
      borderRadius: 4,
      padding: "2px 7px",
      fontSize: 11,
      fontWeight: 500,
      marginRight: 4,
      marginBottom: 4,
    }}>{text}</span>
  );
}

function NodeList({ nodes }) {
  return (
    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
      {nodes.map((n, i) => (
        <li key={i} style={{
          fontSize: 12.5,
          color: "#333",
          marginBottom: 5,
          display: "flex",
          gap: 6,
          alignItems: "flex-start",
          lineHeight: 1.4,
        }}>
          <span style={{
            flexShrink: 0,
            marginTop: 3,
            fontSize: 8,
            color: n.ai ? "#e53935" : "#bbb",
          }}>
            {n.ai ? "🤖" : "◆"}
          </span>
          <span>
            {n.text}
            {n.ai && n.when && (
              <span style={{
                marginLeft: 6,
                background: "#fce4ec",
                color: "#c62828",
                borderRadius: 3,
                padding: "0 5px",
                fontSize: 10,
                fontWeight: 600,
              }}>{n.when}</span>
            )}
          </span>
        </li>
      ))}
    </ul>
  );
}

function RoleCard({ role, expanded, onToggle, isCEO }) {
  return (
    <div style={{
      background: "#fff",
      border: `${isCEO ? 3 : 2}px solid ${role.accent}`,
      borderRadius: 12,
      overflow: "hidden",
      fontFamily: "'Noto Sans TC', sans-serif",
      boxShadow: expanded
        ? `0 6px 28px ${role.accent}40`
        : "0 2px 10px rgba(0,0,0,0.06)",
      transition: "box-shadow 0.3s",
      minWidth: isCEO ? 300 : 250,
      maxWidth: isCEO ? 340 : 300,
    }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          background: role.color,
          padding: isCEO ? "18px 22px" : "13px 18px",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div style={{
            color: role.accent,
            fontSize: 10,
            letterSpacing: 2.5,
            fontWeight: 700,
            textTransform: "uppercase",
            marginBottom: 2,
          }}>{role.title}</div>
          <div style={{
            color: "#fff",
            fontSize: isCEO ? 17 : 14,
            fontWeight: 600,
          }}>{role.sub}</div>
        </div>
        <div style={{
          color: role.accent,
          fontSize: 18,
          transition: "transform 0.3s",
          transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
        }}>▾</div>
      </div>

      {expanded && (
        <div style={{ padding: "14px 18px 12px" }}>

          {/* Work Nodes */}
          <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#999", fontWeight: 700, marginBottom: 7, textTransform: "uppercase" }}>
            工作節點
          </div>
          <NodeList nodes={role.nodes} />

          {/* Key Projects */}
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#999", fontWeight: 700, marginBottom: 6, textTransform: "uppercase" }}>
              2026 重大項目
            </div>
            {role.projects.map((p, i) => (
              <div key={i} style={{ fontSize: 12, color: "#444", marginBottom: 4, lineHeight: 1.4 }}>{p}</div>
            ))}
          </div>

          {/* Systems */}
          <div style={{ marginTop: 10 }}>
            <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#999", fontWeight: 700, marginBottom: 5, textTransform: "uppercase" }}>使用系統</div>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {role.systems.map((s, i) => (
                <Tag key={i} text={s} color={role.color} bg={`${role.color}12`} />
              ))}
            </div>
          </div>

          {/* Auto Targets */}
          {role.autoTargets && (
            <div style={{ marginTop: 10 }}>
              <div style={{ fontSize: 10, letterSpacing: 1.5, color: "#999", fontWeight: 700, marginBottom: 5, textTransform: "uppercase" }}>⚡ 自動化目標</div>
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                {role.autoTargets.map((a, i) => (
                  <Tag key={i} text={a} color="#c62828" bg="#fce4ec" />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function TimelinePanel() {
  return (
    <div style={{
      maxWidth: 900,
      margin: "32px auto 0",
      background: "#fff",
      border: "1.5px solid #e0e0e0",
      borderRadius: 14,
      overflow: "hidden",
      fontFamily: "'Noto Sans TC', sans-serif",
    }}>
      <div style={{ background: "#1a1a2e", padding: "14px 24px" }}>
        <div style={{ color: "#e8c547", fontSize: 11, letterSpacing: 2, fontWeight: 700 }}>CLAUDE COWORK 時間軸</div>
        <div style={{ color: "#fff", fontSize: 14, marginTop: 2 }}>各節點 Claude 介入的時機</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 0 }}>
        {TIMELINE.map((t, i) => (
          <div key={i} style={{
            padding: "16px 20px",
            borderRight: i % 2 === 0 ? "1px solid #f0f0f0" : "none",
            borderBottom: i < 2 ? "1px solid #f0f0f0" : "none",
          }}>
            <div style={{
              display: "inline-block",
              background: t.color,
              color: "#fff",
              borderRadius: 5,
              padding: "3px 10px",
              fontSize: 11,
              fontWeight: 700,
              marginBottom: 10,
            }}>{t.phase}</div>
            <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
              {t.tasks.map((task, j) => (
                <li key={j} style={{
                  fontSize: 12,
                  color: "#444",
                  marginBottom: 5,
                  display: "flex",
                  gap: 6,
                  alignItems: "flex-start",
                }}>
                  <span style={{ color: t.color, flexShrink: 0 }}>•</span>
                  {task}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────
export default function OrgChart() {
  const [exp, setExp] = useState({ ceo: true });
  const toggle = (id) => setExp(p => ({ ...p, [id]: !p[id] }));

  const ceo = ROLES.find(r => r.id === "ceo");
  const children = ROLES.filter(r => r.id !== "ceo");

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f4f3ef",
      padding: "28px 16px 60px",
      fontFamily: "'Noto Sans TC', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Header */}
      <div style={{ textAlign: "center", marginBottom: 28 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#aaa", fontWeight: 700, marginBottom: 4 }}>大綠地家具 DA LÜDI</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 }}>組織架構 × 工作節點 × Claude Cowork</div>
        <div style={{ fontSize: 11, color: "#aaa" }}>
          🤖 紅色節點 = Claude 可介入 cowork ｜ ⚡ 自動化目標 ｜ 點擊展開
        </div>
      </div>

      {/* CEO */}
      <div style={{ display: "flex", justifyContent: "center", marginBottom: 0 }}>
        <RoleCard role={ceo} expanded={!!exp.ceo} onToggle={() => toggle("ceo")} isCEO />
      </div>

      {/* Vertical stem */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: 2, height: 28, background: "#e8c547" }} />
      </div>

      {/* Horizontal bar */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "min(95%, 1800px)", height: 2, background: "#ddd" }} />
      </div>

      {/* Children */}
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 18,
        marginTop: 0,
      }}>
        {children.map(role => (
          <div key={role.id} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div style={{ width: 2, height: 28, background: role.accent + "99" }} />
            <RoleCard role={role} expanded={!!exp[role.id]} onToggle={() => toggle(role.id)} />
          </div>
        ))}
      </div>

      {/* Timeline */}
      <TimelinePanel />

      {/* Legend */}
      <div style={{
        maxWidth: 700,
        margin: "20px auto 0",
        background: "#fff",
        border: "1px solid #e0e0e0",
        borderRadius: 10,
        padding: "14px 20px",
        fontSize: 11.5,
        color: "#666",
      }}>
        <div style={{ fontWeight: 700, color: "#333", marginBottom: 8 }}>圖例說明</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
          <span>🤖 = Claude 可直接 cowork 的節點</span>
          <span>⚡ = 可用 Make/Zapier 自動化的節點</span>
          <span>◆ = 人工執行節點</span>
          <span>紅色標籤 = 建議介入時間點</span>
        </div>
      </div>
    </div>
  );
}
