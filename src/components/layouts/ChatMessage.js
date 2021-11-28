import React from "react";
import styled from "styled-components";
const ChatMessage = ({ you, data }) => {
  return (
    <Container
      style={{
        background: you ? " #FE9898" : "white",
        float: you ? "right" : "left",
        textAlign: you ? "right" : "left",
        borderRadius: you ? " 20px 20px 0 20px" : " 20px 20px 20px 0px",
      }}
    >
      <p>
        <span style={{ whiteSpace: "pre-wrap" }}>{data?.msg}</span>
        <br />
        <span style={{ float: "right", fontSize: "xx-small" }}>
          {(data?.time &&
            new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(data?.time)) ||
            "now"}
        </span>
      </p>
    </Container>
  );
};
const Container = styled.div`
  width: 50%;
  margin: 10px 2px;
  padding: 5px 30px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
`;
export default ChatMessage;
