import type { ChildrenTableInterface } from './table.type';

export const Tbody = (props: ChildrenTableInterface) => {
  return <tbody>{props.children}</tbody>;
};
