import { useState } from "react";

const ADMIN_EMAIL = "dlwpdls87@naver.com";

export default function Home() {
  const [email, setEmail] = useState("");
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [approved, setApproved] = useState(false);
  const [files, setFiles] = useState([]);

  // 로그인
  const login = () => {
    if (!email) return alert("이메일을 입력하세요");

    setUser(email);

    if (email === ADMIN_EMAIL) {
      setIsAdmin(true);
      setApproved(true);
    } else {
      setIsAdmin(false);
      setApproved(false);
    }
  };

  // 파일 여러개 업로드
  const handleFiles = (e) => {
    const selected = Array.from(e.target.files);
    setFiles(selected);
  };

  // 분석 버튼 (임시)
  const analyze = () => {
    alert("📄 OCR 분석 기능 연결 예정");
  };

  // 로그인 화면
  if (!user) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h1 style={styles.title}>🏥 병력 분석 시스템</h1>
          <p style={styles.subtitle}>PDF / 이미지 업로드 기반 자동 분석</p>

          <input
            style={styles.input}
            placeholder="이메일 입력"
            onChange={(e) => setEmail(e.target.value)}
          />

          <button style={styles.primaryBtn} onClick={login}>
            로그인
          </button>
        </div>
      </div>
    );
  }

  // 승인 대기
  if (!approved && !isAdmin) {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <h2>⏳ 관리자 승인 대기중</h2>
          <p>승인 후 서비스 이용이 가능합니다.</p>
        </div>
      </div>
    );
  }

  // 메인 대시보드
  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <h1>🏥 병력 분석 대시보드</h1>
        <p>{user}</p>
      </div>

      <div style={styles.grid}>
        {/* 업로드 카드 */}
        <div style={styles.card}>
          <h2>📤 파일 업로드</h2>
          <p>PDF 또는 이미지 여러 장 업로드 가능</p>

          <input
            type="file"
            multiple
            accept="image/*,.pdf"
            onChange={handleFiles}
            style={styles.fileInput}
          />

          {files.length > 0 && (
            <div style={styles.fileList}>
              {files.map((f, i) => (
                <div key={i} style={styles.fileItem}>
                  📎 {f.name}
                </div>
              ))}
            </div>
          )}

          <button style={styles.primaryBtn} onClick={analyze}>
            분석 시작
          </button>
        </div>

        {/* 결과 카드 */}
        <div style={styles.card}>
          <h2>📊 분석 결과</h2>

          <table style={styles.table}>
            <thead>
              <tr>
                <th>진료기간</th>
                <th>상병코드</th>
                <th>병명</th>
                <th>기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>2024.01~02</td>
                <td>J03</td>
                <td>편도염</td>
                <td>입원 3일</td>
              </tr>
              <tr>
                <td>2023.10</td>
                <td>I21</td>
                <td>심근경색</td>
                <td>입원 7일</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {isAdmin && (
        <div style={styles.adminBadge}>🟢 관리자 모드 활성화</div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f6f9ff, #ffffff)",
    padding: 40,
    fontFamily: "Arial"
  },

  header: {
    marginBottom: 20
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: 20
  },

  card: {
    background: "#fff",
    padding: 20,
    borderRadius: 16,
    boxShadow: "0 6px 20px rgba(0,0,0,0.06)"
  },

  title: {
    color: "#1d4ed8",
    marginBottom: 10
  },

  subtitle: {
    color: "#666",
    marginBottom: 20
  },

  input: {
    width: "100%",
    padding: 12,
    borderRadius: 10,
    border: "1px solid #ddd",
    marginBottom: 10
  },

  fileInput: {
    marginTop: 10,
    marginBottom: 10
  },

  primaryBtn: {
    width: "100%",
    padding: 12,
    background: "#2563eb",
    color: "white",
    border: "none",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold"
  },

  fileList: {
    marginTop: 10,
    background: "#f1f5ff",
    padding: 10,
    borderRadius: 10
  },

  fileItem: {
    fontSize: 13,
    marginBottom: 5
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  adminBadge: {
    marginTop: 20,
    padding: 10,
    background: "#dcfce7",
    color: "#166534",
    borderRadius: 10,
    display: "inline-block"
  }
};
