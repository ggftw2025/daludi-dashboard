import { useState } from "react";

const COMPANY_O = "成為台灣商業空間首選戶外家具夥伴，建立可持續複製的系統化組織";

const COMPANY_KRS = [
  { kr: "全年營業額達3,600萬（月均300萬）", target: "3,600萬", unit: "營業額", accept: "2,880萬（80%）" },
  { kr: "年底帳上現金流達900萬（現約450萬）", target: "900萬", unit: "現金", accept: "720萬" },
  { kr: "ToC年底單月貢獻達100萬", target: "100萬/月", unit: "ToC", accept: "70萬" },
  { kr: "CEO工作中可授權比例達60%（現約20%）", target: "60%", unit: "去依賴", accept: "50%" },
  { kr: "全部門SOP文件化完成率100%", target: "100%", unit: "系統化", accept: "80%" },
];

const QUARTERS = [
  {
    id: "q2",
    label: "Q2",
    period: "4–6月",
    theme: "打地基",
    color: "#e53935",
    desc: "人員到位、流程建立、展間開幕",
    byDept: [
      {
        dept: "CEO",
        items: [
          "完成財務/運營交接錄音→SOP文件化",
          "定價流程工具建立（Google Sheet自動算）",
          "品牌標籤 & 防塵雨罩方案確認",
          "4/7 正航ERP廠商會議決策",
          "ToC策略確認（爸爸IP + 廣告方向）",
        ],
      },
      {
        dept: "財務",
        items: [
          "到職：學習現有ERP高格亞翼",
          "現金流日報中繼工作台建立（Google Sheet）",
          "銀行多帳戶餘額看板",
          "廣告ROAS數據架構建立（Notion→Make→報表）",
          "產品資料庫工具初版（取代手打貨代文件）",
        ],
      },
      {
        dept: "營運",
        items: [
          "【最優先】倉庫舊存清空+新存倉位定位",
          "B2B/B2C工作流程拆分完成",
          "請假系統數位化（一週內完成）",
          "在途貨追蹤表建立（Google Sheet，業務可查）",
          "5月台北展間開幕協調",
        ],
      },
      {
        dept: "行銷",
        items: [
          "5月台北展間：設計師邀請名單+活動設計",
          "B2B電子報第1-2期發送",
          "Prompt工具包建立（降低AI使用門檻）",
          "ToC廣告漏斗架構規劃（爸爸IP）",
          "大綠地好友計劃啟動",
        ],
      },
      {
        dept: "銷售",
        items: [
          "北台灣設計師開發（BNI+展間）",
          "在途貨查詢工具上線→業務確認時間從半天→5分鐘",
          "日報數據來源標記落實（計算ROAS用）",
          "舊客回訪：每週10筆，新客開發：每週3筆",
        ],
      },
    ],
  },
  {
    id: "q3",
    label: "Q3",
    period: "7–9月",
    theme: "提速",
    color: "#f57c00",
    desc: "系統深化、ToC起量、正航準備",
    byDept: [
      {
        dept: "CEO",
        items: [
          "印尼官網初版規劃 & 外銷產品定義",
          "ToC柚木新產品設計方向確定",
          "業務手機查詢介面（輕量Web App）評估上線",
          "正航ERP資料整理啟動（財務主導）",
          "Q2 OKR review & Q3目標校正",
        ],
      },
      {
        dept: "財務",
        items: [
          "ROAS自動計算報表完成",
          "產品資料庫工具：點選產品→自動產出貨代文件",
          "正航ERP資料遷移準備（清帳/整理歷史資料）",
          "內外帳整合評估啟動",
          "薪資計算模組（毛利提成+特價品2%）建立",
        ],
      },
      {
        dept: "營運",
        items: [
          "進銷存×Shopify自動同步（Make）上線",
          "低庫存自動通知採購機制",
          "印尼貨櫃週期優化（從雙月小櫃→合理節奏）",
          "師傅電子工單系統",
          "安全庫存計算模型建立（基於歷史銷售數據）",
        ],
      },
      {
        dept: "行銷",
        items: [
          "ToC廣告漏斗跑起來（爸爸IP內容+廣告投放）",
          "B2B電子報第3-4期",
          "LINE@ B2B/B2C分群推播策略執行",
          "ToC月營業額目標：50萬",
          "數據看板：各渠道轉換率可視化",
        ],
      },
      {
        dept: "銷售",
        items: [
          "台北展間設計師轉換跟進",
          "定製品報價流程：業務自行用工具算，不等CEO",
          "ToC業務助理需求評估（視量決定是否招聘）",
        ],
      },
    ],
  },
  {
    id: "q4",
    label: "Q4",
    period: "10–12月",
    theme: "收割+換軌",
    color: "#1565c0",
    desc: "正航上線、ToC衝刺、年度收尾",
    byDept: [
      {
        dept: "CEO",
        items: [
          "正航ERP上線監控（財務主導，CEO確認里程碑）",
          "2027計畫制定（印尼/中國布套工作室）",
          "年度OKR達成率review",
          "印尼外銷：第一批詢價或展覽評估",
          "ToC業務助理決策（招1-2人or繼續觀察）",
        ],
      },
      {
        dept: "財務",
        items: [
          "正航ERP：10-11月上線，12月全員使用",
          "1月新年度正式跑正航",
          "全年財務報表產出",
          "帳上現金流確認是否達900萬目標",
          "2027預算規劃",
        ],
      },
      {
        dept: "營運",
        items: [
          "正航ERP切換：倉儲模組接軌",
          "全部門SOP文件最終版確認",
          "年底庫存盤點",
          "印尼貨櫃Q1 2027規劃",
        ],
      },
      {
        dept: "行銷",
        items: [
          "ToC衝刺：目標年底單月100萬",
          "年底促銷活動設計",
          "2027行銷策略規劃",
          "全年ROAS分析報告",
        ],
      },
      {
        dept: "銷售",
        items: [
          "Q4大單衝刺（B2B年底預算用完潮）",
          "2027客戶開發計畫",
          "ToC轉換率全年回顧",
        ],
      },
    ],
  },
];

const DEPT_OKRS = [
  {
    dept: "財務",
    color: "#4fc3f7",
    O: "建立透明、可追蹤的財務數字系統，讓決策有數據依據",
    KRs: [
      "現金流日報準確率100%（每日更新）",
      "廣告ROAS報表每月自動產出",
      "正航ERP 12月全員上線",
      "產品資料庫工具：貨代文件產出時間從2小時→10分鐘",
    ],
  },
  {
    dept: "營運",
    color: "#81c784",
    O: "建立從採購到出貨的可視化系統，讓每一件貨的狀態清晰可查",
    KRs: [
      "Q2倉庫舊存清空，新存倉位定位完成",
      "在途貨追蹤：業務確認到貨時間從半天→5分鐘",
      "Shopify庫存同步：誤差率<1%",
      "全部門SOP文件化100%完成",
    ],
  },
  {
    dept: "行銷",
    color: "#f48fb1",
    O: "建立B2B設計師認知 + ToC品牌漏斗，讓大綠地不只是戶外家具",
    KRs: [
      "ToB電子報訂閱人數成長50%",
      "5月展間活動：到場設計師≥30人",
      "ToC年底單月營業額達100萬",
      "爸爸IP廣告ROI正向（Q3開始追蹤）",
    ],
  },
  {
    dept: "銷售",
    color: "#ffb74d",
    O: "提升B2B大單轉換速度，同時建立ToC基礎客群",
    KRs: [
      "全年業績達2,880萬（公司目標80%）",
      "設計師/工程商新客開發：每週3筆落實",
      "定製品報價：業務自行完成率>80%（不等CEO）",
      "客戶轉介率（好友計劃）：月均≥2筆",
    ],
  },
];

// ─── UI ────────────────────────────────────────────────────────
function KRRow({ kr, accept }) {
  return (
    <div style={{
      display: "flex", alignItems: "flex-start", gap: 8,
      marginBottom: 8, fontSize: 13, color: "#333", lineHeight: 1.5,
    }}>
      <span style={{ color: "#e8c547", fontWeight: 700, flexShrink: 0, marginTop: 1 }}>KR</span>
      <div>
        {kr}
        {accept && <span style={{
          marginLeft: 8, fontSize: 11, color: "#888",
          background: "#f5f5f5", borderRadius: 3, padding: "1px 6px",
        }}>可接受：{accept}</span>}
      </div>
    </div>
  );
}

function CompanyOKR() {
  return (
    <div style={{
      background: "#1a1a2e", borderRadius: 14, padding: "22px 28px",
      maxWidth: 900, margin: "0 auto 28px", fontFamily: "'Noto Sans TC', sans-serif",
    }}>
      <div style={{ fontSize: 10, letterSpacing: 3, color: "#e8c547", fontWeight: 700, marginBottom: 6 }}>
        大綠地 2026 北極星 OBJECTIVE
      </div>
      <div style={{ fontSize: 16, color: "#fff", fontWeight: 600, marginBottom: 18, lineHeight: 1.5 }}>
        {COMPANY_O}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10 }}>
        {COMPANY_KRS.map((k, i) => (
          <div key={i} style={{
            background: "rgba(255,255,255,0.07)", borderRadius: 8,
            padding: "12px 14px", borderLeft: "3px solid #e8c547",
          }}>
            <div style={{ fontSize: 11, color: "#e8c547", fontWeight: 700, marginBottom: 4 }}>{k.unit}</div>
            <div style={{ fontSize: 13, color: "#fff", lineHeight: 1.4, marginBottom: 6 }}>{k.kr}</div>
            <div style={{ fontSize: 11, color: "#aaa" }}>目標：{k.target}</div>
            <div style={{ fontSize: 11, color: "#888" }}>底線：{k.accept}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QuarterCard({ q, expanded, onToggle }) {
  return (
    <div style={{
      background: "#fff", border: `2px solid ${q.color}22`,
      borderRadius: 12, overflow: "hidden", marginBottom: 16,
      fontFamily: "'Noto Sans TC', sans-serif",
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
    }}>
      <div
        onClick={onToggle}
        style={{
          background: q.color, padding: "14px 20px", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{
            background: "rgba(255,255,255,0.2)", borderRadius: 8,
            padding: "4px 12px", fontSize: 18, fontWeight: 700, color: "#fff",
          }}>{q.label}</div>
          <div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>{q.period}</div>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>主題：{q.theme}</div>
          </div>
          <div style={{ color: "rgba(255,255,255,0.85)", fontSize: 12, marginLeft: 8 }}>{q.desc}</div>
        </div>
        <div style={{
          color: "#fff", fontSize: 18,
          transform: expanded ? "rotate(180deg)" : "none",
          transition: "transform 0.3s",
        }}>▾</div>
      </div>

      {expanded && (
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 0,
        }}>
          {q.byDept.map((d, i) => (
            <div key={i} style={{
              padding: "16px 18px",
              borderRight: "1px solid #f0f0f0",
              borderBottom: "1px solid #f0f0f0",
            }}>
              <div style={{
                display: "inline-block",
                background: `${q.color}18`,
                color: q.color,
                borderRadius: 5,
                padding: "2px 10px",
                fontSize: 11,
                fontWeight: 700,
                marginBottom: 10,
              }}>{d.dept}</div>
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {d.items.map((item, j) => (
                  <li key={j} style={{
                    fontSize: 12.5, color: "#444", marginBottom: 6,
                    display: "flex", gap: 6, alignItems: "flex-start", lineHeight: 1.4,
                  }}>
                    <span style={{ color: q.color, flexShrink: 0, marginTop: 2 }}>•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function DeptOKRs() {
  return (
    <div style={{ maxWidth: 900, margin: "28px auto 0", fontFamily: "'Noto Sans TC', sans-serif" }}>
      <div style={{ fontSize: 11, letterSpacing: 3, color: "#999", fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>
        各部門 OKR
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 14 }}>
        {DEPT_OKRS.map((d, i) => (
          <div key={i} style={{
            background: "#fff", border: `2px solid ${d.color}44`,
            borderRadius: 10, overflow: "hidden",
            boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
          }}>
            <div style={{ background: d.color, padding: "10px 16px" }}>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{d.dept}</div>
            </div>
            <div style={{ padding: "14px 16px" }}>
              <div style={{
                fontSize: 12, color: "#555", lineHeight: 1.5,
                marginBottom: 12, fontStyle: "italic",
                borderLeft: `3px solid ${d.color}`,
                paddingLeft: 10,
              }}>O：{d.O}</div>
              {d.KRs.map((kr, j) => (
                <div key={j} style={{
                  display: "flex", gap: 6, marginBottom: 7,
                  fontSize: 12.5, color: "#333", alignItems: "flex-start",
                }}>
                  <span style={{
                    background: d.color, color: "#fff",
                    borderRadius: 3, padding: "0 4px",
                    fontSize: 10, fontWeight: 700, flexShrink: 0, marginTop: 2,
                  }}>KR</span>
                  {kr}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function OKRDashboard() {
  const [exp, setExp] = useState({ q2: true, q3: false, q4: false });
  const toggle = id => setExp(p => ({ ...p, [id]: !p[id] }));

  return (
    <div style={{
      minHeight: "100vh", background: "#f4f3ef",
      padding: "28px 16px 60px",
      fontFamily: "'Noto Sans TC', sans-serif",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;600;700&display=swap" rel="stylesheet" />

      {/* Title */}
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#aaa", fontWeight: 700, marginBottom: 4 }}>大綠地家具 2026</div>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e" }}>年度 OKR × 季度執行路線圖</div>
        <div style={{ fontSize: 12, color: "#aaa", marginTop: 4 }}>目標3,600萬 / 接受底線2,880萬 / 年底現金900萬</div>
      </div>

      {/* Company OKR */}
      <CompanyOKR />

      {/* Quarterly roadmap */}
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: "#999", fontWeight: 700, marginBottom: 14, textTransform: "uppercase" }}>
          季度執行路線圖（Q2-Q4）
        </div>

        {/* Q1 summary */}
        <div style={{
          background: "#fff", border: "1.5px solid #e0e0e0", borderRadius: 10,
          padding: "14px 20px", marginBottom: 16,
          display: "flex", alignItems: "center", gap: 14,
        }}>
          <div style={{
            background: "#78909c", color: "#fff", borderRadius: 8,
            padding: "4px 12px", fontSize: 14, fontWeight: 700, flexShrink: 0,
          }}>Q1</div>
          <div>
            <div style={{ fontSize: 12, color: "#999" }}>1–3月 ｜ 已完成</div>
            <div style={{ fontSize: 13, color: "#555" }}>招募財務+運營中 / 正航ERP廠商會議（4/7）/ 3月出貨額~211萬</div>
          </div>
          <div style={{ marginLeft: "auto", background: "#e8f5e9", color: "#388e3c", borderRadius: 5, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
            進行中
          </div>
        </div>

        {QUARTERS.map(q => (
          <QuarterCard key={q.id} q={q} expanded={!!exp[q.id]} onToggle={() => toggle(q.id)} />
        ))}
      </div>

      {/* Dept OKRs */}
      <DeptOKRs />

      {/* Key constraints */}
      <div style={{
        maxWidth: 900, margin: "24px auto 0",
        background: "#1a1a2e", borderRadius: 12, padding: "18px 24px",
        fontFamily: "'Noto Sans TC', sans-serif",
      }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: "#e8c547", fontWeight: 700, marginBottom: 10 }}>
          ⚠️ 今年最關鍵的三個限制條件
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          {[
            { title: "人員交接期 Q2", desc: "財務+運營新人Q2才穩定，這段時間CEO仍需高度介入，不要同時啟動太多新項目" },
            { title: "正航上線 Q4 摩擦", desc: "10-12月系統切換會消耗財務+運營大量注意力，Q4業務衝刺需要銷售和行銷主扛" },
            { title: "ToC 100萬是挑戰", desc: "從零到100萬需要漏斗建好+廣告跑通+出貨流程支撐，三者缺一。Q2不啟動Q3就來不及" },
          ].map((c, i) => (
            <div key={i} style={{
              background: "rgba(255,255,255,0.07)", borderRadius: 8,
              padding: "12px 14px", borderLeft: "3px solid #e53935",
            }}>
              <div style={{ color: "#e8c547", fontSize: 12, fontWeight: 700, marginBottom: 6 }}>{c.title}</div>
              <div style={{ color: "#ccc", fontSize: 12, lineHeight: 1.5 }}>{c.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
