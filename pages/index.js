import { useState } from "react";

const ADMIN_EMAIL = "dlwpdls87@naver.com";

export default function Home() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [approved, setApproved] = useState(false);

  // 로그인
  const login = () => {
    if (!email) return alert("이메일 입력");

    setUser(email);

    if (email === ADMIN_EMAIL) {
      setIsAdmin(true);
      setApproved(true);
    } else {
      setIsAdmin(false);
      setApproved(false);
    }
  };

  // (임시) 파일 업로드 처리
  const handleFile = (e) => {
    alert("여기서 PDF/이미지 분석 로직 연결 예정");
  };

  // 로그인 안됨
  if (!user) {
    return (
      <div style={styles.container}>
        <h1>병력 분석 시스템</h1>

        <input
          style={styles.input}
          placeholder="이메일 입력"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button style={styles.button} onClick={login}>
          로그인
        </button>
      </div>
    );
  }

  // 승인 필요 화면
  if (!approved && !isAdmin) {
    return (
      <div style={styles.container}>
        <h2>승인 대기중</h2>
        <p>관리자 승인 후 사용 가능합니다.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1>병력 PDF 분석 업로드</h1>

      <p>로그인: {user}</p>

      <input type="file" accept="image/*,.pdf" onChange={handleFile} />

      <div style={{ marginTop: 20 }}>
        <h3>분석 결과 (예시)</h3>

        <table border="1" cellPadding="8">
          <thead>
            <tr>
              <th>진료기간</th>
              <th>주상병코드</th>
              <th>병명</th>
              <th>입원/통원</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2024-01~2024-02</td>
              <td>J03</td>
              <td>편도염</td>
              <td>입원 3일</td>
            </tr>
          </tbody>
        </table>
      </div>

      {isAdmin && (
        <p style={{ color: "green" }}>관리자 권한 활성화됨</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: 40,
    fontFamily: "Arial"
  },
  input: {
    padding: 10,
    margin: 10
  },
  button: {
    padding: 10,
    cursor: "pointer"
  }
};
