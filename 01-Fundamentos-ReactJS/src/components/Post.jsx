import { format, formatDistanceToNow } from 'date-fns/esm';
import ptBR from 'date-fns/esm/locale/pt-BR';
import { useState } from 'react';
import { Avatar } from './Avatar';
import { Comment } from './Comment';
import styles from './Post.module.css';

/*
# Programação imperativa
O que deve ser feito (Passo-a-passo).

# Programação declarativa
Quais as condições para ter o resultado final.

*/

export function Post({author, content, publishedAt}){

  const [comments, setComments] = useState([
    'Post muito bacana ein!'
  ]);
  const [newCommentText, setNewCommentText] = useState('');

  const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'de' yyyy 'às' HH:mm'h'", {
    locale: ptBR
  })

  const publishedDateRelativeNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  })

  function handleCreateNewComment(){
    event.preventDefault();

    setComments([...comments, newCommentText])
    setNewCommentText('');
  }

  function handleNewCommentChange(){
    setNewCommentText(event.target.value);
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src={author.avatarUrl} />
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if(line.type === 'paragraph') return (
            <p>{line.content}</p>
          )
          else if(line.type === 'link') return (
            <p><a href="#">{line.content}</a></p>
          )
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          onChange={(handleNewCommentChange)}
          value={newCommentText}
          placeholder="Deixe um comentário"
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {comments.map(comment => <Comment content={comment} />)}
      </div>

    </article>
  )
}