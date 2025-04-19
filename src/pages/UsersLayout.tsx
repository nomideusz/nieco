import { JSX } from 'solid-js';

const UsersLayout = (props: { children?: JSX.Element }): JSX.Element => {
  return (
    <div class="users-layout">
      <h1 class="text-2xl font-bold mb-4">Users Section</h1>
      <div class="users-content">
        {props.children}
      </div>
    </div>
  );
};

export default UsersLayout; 