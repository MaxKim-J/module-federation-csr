import { Suspense, useEffect, useState, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback: ReactNode;
}

function ClientSuspense({ children, fallback }: Props) {
  const [isMount, setIsMount] = useState(false);

  useEffect(() => {
    setIsMount(true);
  }, []);

  return <>{isMount && <Suspense fallback={fallback}>{children}</Suspense>}</>;
}

export default ClientSuspense;
