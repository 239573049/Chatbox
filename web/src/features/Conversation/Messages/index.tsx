import { useCallback } from 'react';


import { MarkdownCustomRender, RenderBelowMessage, RenderMessage } from '../types';
import { DefaultBelowMessage, DefaultMessage } from './Default';
import {  UserMarkdownRender, UserMessage } from './User';

export const renderMessages: Record<string, RenderMessage> = {
  assistant: DefaultMessage,
  default: DefaultMessage,
  function: DefaultMessage,
  user: UserMessage,
};

export const renderBelowMessages: Record<string, RenderBelowMessage> = {
  default: DefaultBelowMessage,
};

export const markdownCustomRenders: Record<string, MarkdownCustomRender> = {
  user: UserMarkdownRender,
};

export const useAvatarsClick = (role?: string) => {

  return useCallback(() => {
    switch (role) {
      case 'assistant': {
        // do nothing
      }
    }
  }, [role]);
};
