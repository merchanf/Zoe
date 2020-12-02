import styles from './Card.module.scss';

const Card = ({id, name, avatar, income}) => {
  return (
    <div className={styles.Card}>
      <img src="https://utthunga.com/wp-content/uploads/2020/05/dummy450x450.jpg" alt="profile picture"/>
      <div className={styles.Card__Content}>
        <span className={styles.Card__Content__Name}>{name}</span>
        <span className={styles.Card__Content__Id}>{id}</span>
        <div className={styles.Card__Content__Footer}>
          <span className={styles.Card__Content__Footer__Label}>
            Income
            <strong >{` ${new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0  }).format(income)}`}</strong>
          </span>
        </div>
      </div>
      
    </div>
  )
}

export default Card
