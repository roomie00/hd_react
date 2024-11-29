import React from "react";

const MemberList = ({ members }) => {
  return (
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
  );
};

const styles = {
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

export default MemberList;
