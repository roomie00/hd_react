import React, { useState, useEffect } from "react";
import axios from "axios";

// URL 설정을 맨 위에 정의
const BASE_URL = "http://localhost:8080"; // 여기에 API URL을 설정

const App = () => {
  const [members, setMembers] = useState([]);
  const [idValue, setIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");

  // 초기 멤버 데이터 가져오기
  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/members`); // BASE_URL 사용
        setMembers(response.data);
      } catch (error) {
        console.error("Error fetching members:", error);
      }
    };
    fetchMembers();
  }, []);

  // 새로운 멤버 추가
  const handleAddMember = async (e) => {
    e.preventDefault();

    const newMember = {
      id: idValue,
      name: nameValue,
    };

    // 클라이언트 상태에 먼저 추가
    setMembers((prevMembers) => [...prevMembers, newMember]);

    try {
      // 서버에 추가 요청
      await axios.post(`${BASE_URL}/members`, newMember); // BASE_URL 사용
    } catch (error) {
      console.error("Error adding member to server:", error);

      // 서버 요청 실패 시 상태에서 제거
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== newMember.id)
      );
    }

    // 입력 필드 초기화
    setIdValue("");
    setNameValue("");
  };

  return (
    <div style={styles.container}>
      <h1>멤버 관리</h1>
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
    </div>
  );
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

export default App;
