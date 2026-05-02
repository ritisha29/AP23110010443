import type { Metadata } from "next";
import ThemeRegistry from "@/components/ThemeRegistry";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Box from '@mui/material/Box';

export const metadata: Metadata = {
  title: "Campus Notifications",
  description: "Priority Inbox and Notifications",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>
          <AppBar position="static" color="transparent" elevation={0} sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1, color: 'primary.main' }}>
                Campus Notifications
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Button color="inherit">Priority Inbox</Button>
                </Link>
                <Link href="/all" style={{ color: 'inherit', textDecoration: 'none' }}>
                  <Button color="inherit">All Notifications</Button>
                </Link>
              </Box>
            </Toolbar>
          </AppBar>
          <Box component="main" sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
            {children}
          </Box>
        </ThemeRegistry>
      </body>
    </html>
  );
}
