import React, { useEffect, useState } from "react";

import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
  const [year, setYear] = useState("");

  useEffect(() => {
    const date = new Date();
    const yearFromDate = date.getFullYear();
    setYear(yearFromDate);
  }, []);

  return (
    <footer id="footer">
      <div className="footer-wrapper">
        <a
          className="icon"
          href="https://github.com/b4kii"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
        <a
          className="icon"
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
        <p
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <span className="footer-copy">&copy;</span>
          <span className="year">{year} Baki</span>
        </p>
      </div>
    </footer>
  );
}
