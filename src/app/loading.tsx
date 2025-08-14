'use client';

import React from 'react';

import { Loading } from '@/components';

interface LoadingPageProps {
  message?: string;
  overlay?: boolean;
}

export default function LoadingPage(props: LoadingPageProps) {
  return <Loading {...props} />;
}
