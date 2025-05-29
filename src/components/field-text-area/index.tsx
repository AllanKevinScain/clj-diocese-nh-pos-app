'use client';

import { styled, TextareaAutosize } from '@mui/material';

export const FieldTextarea = styled(TextareaAutosize)(
  () => `
    box-sizing: border-box;
    width: 100%;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    padding: 8px 12px;
    border-radius: 8px;

    /* firefox */
    &:focus-visible {
      outline: 0;
    }
  `,
);
