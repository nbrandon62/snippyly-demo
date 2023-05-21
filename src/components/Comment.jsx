import { SnippylyComments, SnippylyCommentTool } from '@snippyly/react';

const Comment = () => {
  return (
    <>
      <SnippylyComments />

      <div className='toolbar'>
        <SnippylyCommentTool />
      </div>
    </>
  );
};

export default Comment;
