"use client";
import React from "react";
import styled from "styled-components";
import "./globals.css";
import Link from "next/link";
import ViewSidebarSharpIcon from "@mui/icons-material/ViewSidebarSharp";
import Filter1SharpIcon from "@mui/icons-material/Filter1Sharp";
import Filter2SharpIcon from "@mui/icons-material/Filter2Sharp";
import Filter3SharpIcon from "@mui/icons-material/Filter3Sharp";
import { useState } from "react";
import { Providers } from "./providers";

const Container = styled.div`
  display: flex;
  height: 100vh;
`;

const Navigation = styled.div<{ isOpen: boolean }>`
  border-right: 1px solid #e0e0e0;
  /* width: ${({ isOpen }) => (isOpen ? 145 : 0)}px; */
  width: 145px;
  transition: width 0.3s ease;
  overflow: hidden;
  user-select: none;

  a {
    display: flex;
    line-height: 60px;
    padding: 0 15px;
    align-items: center;
    flex-wrap: nowrap;

    &:hover {
      cursor: pointer;
    }

    svg {
      margin-right: 12px;
    }

    span {
      white-space: nowrap;
    }
  }
`;

const TopNavBar = styled.div`
  padding: 22px 0;
  border-bottom: 1px solid #e0e0e0;
`;

const PageContainer = styled.div`
  flex: 1;
`;

const ListItem = styled.li``;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isNavOpen, setIsNavOpen] = useState(true); // State to control navigation visibility

  return (
    <html lang="en" className="light">
      <body>
        <Providers>
          <Container>
            <Navigation>
              <ul>
                <ListItem>
                  <Link href="/">
                    <Filter1SharpIcon />
                    <span>Challenge 1</span>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/challenge-2">
                    <Filter2SharpIcon />
                    <span>Challenge 2</span>
                  </Link>
                </ListItem>
                <ListItem>
                  <Link href="/challenge-3">
                    <Filter3SharpIcon />
                    <span> Challenge 3</span>
                  </Link>
                </ListItem>
              </ul>
            </Navigation>
            <PageContainer className="mx-3.5 px-3.5">
              <TopNavBar>
                <div>
                  <ViewSidebarSharpIcon
                    color="primary"
                    onClick={() => setIsNavOpen((prevState) => !prevState)}
                  />
                </div>
              </TopNavBar>
              {children}
            </PageContainer>
          </Container>
        </Providers>
      </body>
    </html>
  );
}
