const App = () => {
  const [members, setMembers] = useState([]);
  const [idValue, setIdValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [isLoading, setIsLoading] = useState(true); // 로딩 상태 추가
  const [error, setError] = useState(null); // 에러 상태 추가

  useEffect(() => {
    const fetchMembers = async () => {
      setIsLoading(true); // 로딩 시작
      setError(null); // 기존 에러 초기화
      try {
        const response = await axios.get(`${BASE_URL}/members`);
        setMembers(response.data);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Failed to load members. Please try again later.");
      } finally {
        setIsLoading(false); // 로딩 종료
      }
    };

    fetchMembers();
  }, []);

  const handleAddMember = async (e) => {
    e.preventDefault();

    const newMember = {
      id: idValue,
      name: nameValue,
    };

    setMembers((prevMembers) => [...prevMembers, newMember]);

    try {
      await axios.post(`${BASE_URL}/members`, newMember);
    } catch (error) {
      console.error("Error adding member to server:", error);
      setMembers((prevMembers) =>
        prevMembers.filter((member) => member.id !== newMember.id)
      );
    }

    setIdValue("");
    setNameValue("");
  };

  return (
    <div style={styles.container}>
      <h1>멤버 관리</h1>
      {/* 로딩 상태 표시 */}
      {isLoading && <p>Loading members...</p>}
      {/* 에러 메시지 표시 */}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {/* 로딩 중이 아니고 에러도 없을 때 렌더링 */}
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