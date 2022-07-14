import styles from './Comment.module.css';
import { ThumbsUp, Trash } from 'phosphor-react';
import { Avatar } from './Avatar';
import { useState } from 'react';

export function Comment({ content, onDeleteComment }){

  const [likeCount, setLikeCount] = useState(0);

  function handleDeleteComment(){
    onDeleteComment(content)
  }

  function handleLikeComment(){
    //Utilizar esse padrão sempre que quando atualizar o estado e o novo valor depende do valor anterior.
    setLikeCount(state => {
      return state + 1;
    });
  }

  return(
    <div className={styles.comment}>
      <Avatar hasBorder={false} src="https://images.unsplash.com/photo-1504593811423-6dd665756598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" />
      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>Diego Fernandes</strong>
              <time title="28 de junho 2022" dateTime="2022-06-28 20:35:20">cerca de 1h atrás</time>
            </div>

            <button onClick={handleDeleteComment} title='Deletar comentário'>
              <Trash size={24} />
            </button>
          </header>

          <p>{content}</p>
        </div>
        <footer>
          {/* Em todos os eventos do React, 'onClick, onSubmit, onChance, etc' devemos utilizar funções,
           sem os () porque com os () estamos executando a função e isso pode causar um loop ou
           vários outros problemas. */}
          <button onClick={handleLikeComment}>
            <ThumbsUp />
            Aplaudir <span>{likeCount}</span>
          </button>
        </footer>
      </div>

    </div>
  )
}
