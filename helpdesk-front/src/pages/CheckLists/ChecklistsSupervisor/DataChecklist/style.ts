import styled from "styled-components";

export const HistoryContainer = styled.div`
  flex: 1;

  h1 {
    font-weight: 1.5rem;
    color: #e1e1e6;
  }
`;

export const HistoryList = styled.div`
  flex: 1;
  overflow: auto;
  margin-top: 2rem;

  table {
    width: 100%;
    border-collapse: collapse;
    min-width: 600px;

    tr {
      height: 80px;
      background: #e0e0e0;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      border-radius: 5px 5px 0px 0px;
      margin-bottom: 15px;
    }

    th {
      padding: 1rem;
      text-align: left;
      font-size: 0.875rem;
      line-height: 1.6;

      &:first-child {
        border-top-left-radius: 8px;
        padding-left: 1.5rem;
      }

      &:last-child {
        border-top-right-radius: 8px;
        padding-right: 1.5rem;
      }
    }

    tbody {
      tr {
        /* Rectangle 7 */
        height: 32px;
        background: #ffffff;
        border: 1px solid #e0e0e0;
      }

      tr:hover {
        background: #f0f0f0;
      }

      td {
        padding: 1rem;
        font-size: 0.875rem;
        line-height: 1.6;
        cursor: pointer;

        &:first-child {
          width: 25%;
          padding-left: 1.5rem;
        }

        &:nth-child(4) {
          align-items: center;
        }

        &:nth-child(5) {
          /* styles for the fifth child */
        }

        &:last-child {
          padding-right: 1.5rem;
        }
      }
    }
  }
`;

const STATUS_COLORS = {
  yellow: "yellow-500",
  green: "green-500",
  red: "red-500",
} as const;

interface StatusProps {
  statuscolor: keyof typeof STATUS_COLORS;
}

export const Status = styled.span<StatusProps>`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &::before {
    content: "";
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 9999px;
    background: ${(props) => props.theme[STATUS_COLORS[props.statuscolor]]};
  }
`;
