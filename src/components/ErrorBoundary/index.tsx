"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";

function fallbackRender({ error }: { error: Error }) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <p>{error.message}</p>
    </div>
  );
}

export default function ErrorBoundary({ children }: { children: ReactNode }) {
  return <ReactErrorBoundary fallbackRender={fallbackRender}>{children}</ReactErrorBoundary>;
}
