import React, { useState, useEffect } from "react";
import axios from "axios";

// URL 설정
const BASE_URL = "http://hdserverelb-778609981.ap-northeast-2.elb.amazonaws.com:8080";

const App = () => {
  const [members, setMembers] = useState([]);
  const [idValue, setIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태를 추적
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true); // 데이터 로딩 시작
      setError(null); // 에러 초기화
      try {
        const response = await axios.get(`${BASE_URL}/members`);
        setMembers(response.data); // 멤버 데이터 설정
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to load members. Please try again later."); // 에러 처리
      } finally {
        setIsLoading(false); // 데이터 로딩 완료
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();
    const newMember = { id: idValue, name: nameValue };
    setMembers((prevMembers) => [...prevMembers, newMember]);

    try {
      await axios.post(`${BASE_URL}/members`, newMember); // 멤버 서버에 추가
    } catch (error) {
      console.error("Error adding member:", error);
      setMembers((prevMembers) => prevMembers.filter((member) => member.id !== newMember.id)); // 서버 실패 시 롤백
    }

    setIdValue(""); // ID 입력 필드 초기화
    setNameValue(""); // Name 입력 필드 초기화
  };

  const styles = {
    container: {
      fontFamily: "Arial, sans-serif",
      margin: "0 auto",
      padding: "20px",
      maxWidth: "600px",
      textAlign: "center",
    },
    form: {
      marginBottom: "20px",
    },
    input: {
      margin: "5px",
      padding: "10px",
      width: "150px",
      border: "1px solid #ccc",
      borderRadius: "4px",
    },
    button: {
      padding: "10px 20px",
      backgroundColor: "#007BFF",
      color: "#fff",
      border: "none",
      borderRadius: "4px",
      cursor: "pointer",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginTop: "20px",
    },
    header: {
      borderBottom: "2px solid #ddd",
      padding: "10px",
      textAlign: "left",
      backgroundColor: "#f4f4f4",
    },
    cell: {
      borderBottom: "1px solid #ddd",
      padding: "8px",
    },
  };

  return (
    <div style={styles.container}>
      <h1>멤버 관리</h1>

      {isLoading && <p>Loading members...</p>}  {/* 로딩 중 메시지 */}
      {error && <p style={{ color: "red" }}>{error}</p>}  {/* 에러 메시지 */}

      {!isLoading && !error && (
        <>
          <form onSubmit={handleAddMember} style={styles.form}>
            <input
              type="text"
              placeholder="ID"
              value={idValue}
              onChange={(e) => setIdValue(e.target.value)}
              style={styles.input}
              required
            />
            <input
              type="text"
              placeholder="Name"
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              style={styles.input}
              required
            />
            <button type="submit" style={styles.button}>
              Add Member
            </button>
          </form>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.header}>ID</th>
                <th style={styles.header}>Name</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.id}>
                  <td style={styles.cell}>{member.id}</td>
                  <td style={styles.cell}>{member.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default App;
