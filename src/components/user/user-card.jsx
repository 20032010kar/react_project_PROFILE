import "./UserCard.css";

const UserCard = ({id, name, surname, age, avatar}) => {
    return (
        <div>
            <div class="user-card">
                <div class="user-card__header">
                    <div class="user-card__avatar-wrapper">
                        <img src={avatar} alt="Фото профілю" class="user-card__avatar" />
                        <span class="user-card__status" title="Онлайн"></span>
                    </div>
                    <div class="user-card__main-info">
                        <h2 class="user-card__name">{name} {surname}</h2>
                        <span class="user-card__id">ID: {id}</span>
                    </div>
                </div>

                <div class="user-card__body">
                    <div class="user-card__info-row">
                        <span class="user-card__label">Вік</span>
                        <span class="user-card__value">{age} років</span>
                    </div>
                </div>

                <div class="user-card__footer">
                    <button class="user-card__btn user-card__btn--primary">Профіль</button>
                    <button class="user-card__btn user-card__btn--secondary">Повідомлення</button>
                </div>
            </div>
        </div>
    )
}

export default UserCard;