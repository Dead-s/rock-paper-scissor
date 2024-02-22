import React, { useEffect, useState } from "react";
import styles from "./board.module.scss";

const Board = ({ showRulesBox, setScore, score }) => {
    const [playerSelection, setPlayerSelection] = useState("")
    const [computerSelection, setComputerSelection] = useState("")
    const [winner, setWinner] = useState("")
    const [animation, setAnimation] = useState("end")
    function validate() {
        let result = "";
        if (playerSelection === computerSelection) result = "none";
        else if (playerSelection == "scissor" && (computerSelection == "paper" || computerSelection == "lizard")) result = "player";
        else if (computerSelection == "scissor" && (playerSelection == "paper" || playerSelection == "lizard")) result = "bot";
        else if (playerSelection == "paper" && (computerSelection == "rock" || computerSelection == "spock")) result = "player";
        else if (computerSelection == "paper" && (playerSelection == "rock" || playerSelection == "spock")) result = "bot";
        else if (playerSelection == "rock" && (computerSelection == "lizard" || computerSelection == "scissor")) result = "player";
        else if (computerSelection == "rock" && (playerSelection == "lizard" || playerSelection == "scissor")) result = "bot";
        else if (playerSelection == "lizard" && (computerSelection == "spock" || computerSelection == "paper")) result = "player"
        else if (computerSelection == "lizard" && (playerSelection == "spock" || playerSelection == "paper")) result = "bot";
        else if (playerSelection == "spock" && (computerSelection == "scissor" || computerSelection == "rock")) result = "player";
        else if (computerSelection == "spock" && (playerSelection == "scissor" || playerSelection == "rock")) result = "bot";
        if (result == "player") {
            localStorage.setItem("score", +score + 1);
            setScore((score) => +score + 1);
        };
        return result;
    }
    useEffect(() => {
        setTimeout(() => {
            setAnimation("");
        }, [500])
    }, [])

    useEffect(() => {
        if (winner) {
            document.querySelectorAll("." + styles.outterContainer).forEach((elem) => {
                if (elem.classList.contains(styles.player) && winner == "player") {
                    elem.classList.add(styles.winner)
                } else if (elem.classList.contains(styles.bot) && winner == "bot") {
                    elem.classList.add(styles.winner)
                }
            })
        }
    }, [winner]);
    useEffect(() => {
        if (playerSelection) {
            const selection = ["scissor", "paper", "rock", "lizard", "spock"];
            // const botchoice = "paper";
            const botchoice = selection[Math.floor(Math.random() * 4)];
            setComputerSelection(botchoice)
        }
    }, [playerSelection])

    useEffect(() => {
        if (playerSelection) {
            setTimeout(() => {
                setWinner(validate())
            }, 3000);
            setTimeout(() => {
                document.querySelectorAll("." + styles.outterContainer).forEach((elem) => {
                    if (elem.dataset.choice == computerSelection) {
                        if (computerSelection == playerSelection) {
                            let clone = elem.cloneNode(true);
                            clone.id = "clone";
                            clone.classList.add(styles.hide);
                            setTimeout(() => {
                                clone.classList.add(styles.bot);
                            }, [1000])
                            document.querySelector("." + styles.shape).append(clone);
                        } else {
                            setTimeout(() => {
                                elem.classList.add(styles.bot);
                            }, 500);
                        }
                    }
                    else if (elem.dataset.choice !== playerSelection) {
                        setTimeout(() => {
                            elem.classList.add(styles.none);
                        }, 1500);
                    }
                })
            }, [1500])
        }
    }, [computerSelection])

    function setSelection(choice, e) {
        setTimeout(() => {
            e.target.classList.add(styles.player);
        }, [1000])
        setPlayerSelection(choice);
        setAnimation("end");
    }
    function resetGame() {
        setWinner("");
        setPlayerSelection("")
        setComputerSelection("")
        setAnimation("end");
        setTimeout(() => {
            setAnimation("");
            if (document.getElementById("clone")) document.getElementById("clone").remove();
        }, 800);
        document.querySelectorAll("." + styles.outterContainer).forEach((elem) => {
            elem.classList.remove(styles.player)
            elem.classList.remove(styles.bot)
            elem.classList.remove(styles.winner)
            elem.classList.remove(styles.none)
            elem.classList.remove(styles.hide)
        });

    }

    return <div className={styles.container}>
        <div className={styles.iconsConatainer}>
            <div className={`${styles.shape} ${styles[animation]}`}>
                {playerSelection && computerSelection &&
                    <div className={styles.header}>
                        <span>you picked</span>
                        <span>the house picked</span>
                    </div>
                }
                <div data-choice="scissor" className={`${styles.outterContainer} ${styles.scissors}`} onClick={(e) => { setSelection("scissor", e) }}>
                    <div className={styles.innerConatainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="51" height="58"><path fill="#3B4262" d="M13.971 25.702l6.012-8.415c-2.499-.415-7.088-.507-10.846 3.235C3.212 26.421.812 39.163.312 42.248L15.37 57.24c2.711-.232 14.713-1.827 26.279-13.34.122-.249 2.94-2.321.636-4.614-1.1-1.095-2.919-1.074-4.042.044-.572.57-1.461.577-2.021.02-.56-.557-.552-1.443.02-2.012l4.087-4.069c2.076-2.067.119-5.555-2.78-4.717l-3.345 2.851c-.611.53-1.52.439-2.022-.14-.519-.597-.408-1.503.183-2.013 11.687-10.208 9.98-8.979 17.5-15.995 2.809-2.329-.725-6.447-3.493-4.09L28.182 25.45c-.529.448-1.34.457-1.86-.02-.601-.517-.615-1.262-.222-1.85L38.787 3.944c1.854-2.5-1.795-5.277-3.749-2.757L16.28 27.307c-.452.65-1.364.8-1.985.345a1.377 1.377 0 01-.323-1.95z" /></svg>
                    </div>
                </div>
                <div data-choice="paper" className={`${styles.outterContainer} ${styles.paper}`} onClick={(e) => { setSelection("paper", e) }}>
                    <div className={styles.innerConatainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="49" height="59"><path fill="#3B4262" d="M47.125 11.832a2.922 2.922 0 00-1.232-.198c-.57.04-1.029.271-1.302.65-1.604 2.248-2.919 6.493-3.979 9.905-.486 1.577-1.14 3.688-1.612 4.69-.493-2.807.064-13.09.28-17.05l.003-.064c.15-2.751.17-3.234.138-3.446-.238-1.509-.843-2.5-1.799-2.943-.966-.45-2.22-.25-3.572.563-.677.41-.865 1.816-1.446 8.19l-.002.028c-.32 3.502-1.058 11.566-1.965 12.91-1.023-1.88-2.431-12.555-3.039-17.176-.425-3.236-.673-5.094-.84-5.655-.35-1.176-1.83-2.176-3.295-2.232-1.22-.06-2.22.56-2.698 1.638-.894.995-.578 4.292.41 12.102.47 3.718 1.44 11.395.83 12.257-1.219-.133-3.31-4.942-6.215-14.299-.816-2.62-1.068-3.408-1.318-3.753-.494-1.202-2.172-2.129-3.676-2.024a3.183 3.183 0 00-.377.049c-.787.156-2.584.881-2.2 4.226 1.06 4.637 2.213 8.041 3.331 11.346l.023.066c.669 1.98 1.302 3.85 1.89 5.925 1.385 4.9.846 7.94.84 7.975-.046.312-.143.503-.288.57a.556.556 0 01-.195.045c-.44.03-1.098-.26-1.437-.45-.776-1.482-4.636-8.544-8.134-9.524l-.126-.037-.127.012c-1.283.121-2.226.606-2.803 1.441-.914 1.32-.535 3.002-.444 3.34l.052.12c.028.051 2.834 5.165 3.268 7.544.374 2.04 2.311 4.25 3.869 6.026l.064.073c.508.58.946 1.083 1.292 1.548 4.519 4.713 11.665 8.677 11.723 8.71.892.657 1.387 1.293 1.44 1.84a.798.798 0 01-.16.58l-.155.162.988.96 18.853-1.324.804-3.684c2.486-10.402 1.967-19.272 1.958-19.33.01-.327.706-3.483 1.266-6.033l.017-.065c1.117-5.08 2.505-11.4 2.772-13.803.116-1.028-.542-1.972-1.675-2.401z" /></svg>
                    </div>
                </div>
                <div data-choice="rock" className={`${styles.outterContainer} ${styles.rock}`} onClick={(e) => { setSelection("rock", e) }}>
                    <div className={styles.innerConatainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48"><path fill="#3B4262" d="M45.06 12.22c-.642-8.096-9.734-7.269-9.734-7.269-3.837-6.765-9.832-1.865-9.832-1.865-4.606-6.63-10.38-.486-10.38-.486-9.957-1.074-9.571 7.066-9.571 7.066-.234 2.588 1.403 10.593 1.403 10.593-1.477-4.614-4.68-.784-4.68-.784-3.94 6.078-.975 9.405-.975 9.405 5.33 6.246 16.688 13.743 16.688 13.743 4.113 2.356 2.373 4.457 2.373 4.457l24.876-4.11.571-4.718c3.782-11.436-.739-26.032-.739-26.032z" /></svg>
                    </div>
                </div>
                <div data-choice="lizard" className={`${styles.outterContainer} ${styles.lizard}`} onClick={(e) => { setSelection("lizard", e) }}>
                    <div className={styles.innerConatainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="63" height="60"><path fill="#3B4262" d="M49.483 2.096c3.229-2 6.324-2.433 8.714-1.219 5.359 2.72 4.583 12.845 2.39 17.232-1.238 2.477-3.432 4.287-6.527 5.387-1.2 3.799-2.884 7.064-5.034 9.764a7.904 7.904 0 005.079 1.837h.09l3.02-2.982c.761-.75 1.994-.751 2.754 0 .76.75.76 1.968 0 2.718l-.267.264h.608c1.075 0 1.947.861 1.947 1.923 0 1.061-.872 1.922-1.947 1.922h-.608l.267.264c.76.75.76 1.968 0 2.719-.38.375-.878.563-1.376.563-.499 0-.997-.188-1.377-.563l-3.022-2.983h-.09a11.823 11.823 0 01-7.724-2.857c-.415.377-.843.738-1.284 1.083-3.732 2.92-8.294 4.617-13.627 5.082a12.08 12.08 0 01.343 6.352l-.02.09 2.325 3.66a1.998 1.998 0 01-.589 2.741 1.936 1.936 0 01-1.057.316 1.953 1.953 0 01-1.651-.912l-.206-.324-.13.605a1.966 1.966 0 01-1.913 1.562 1.95 1.95 0 01-.419-.046 1.984 1.984 0 01-1.498-2.36l.13-.605-.32.209a1.946 1.946 0 01-2.709-.597 1.998 1.998 0 01.59-2.74l3.617-2.353.02-.09a8.073 8.073 0 00-.713-5.394 44.773 44.773 0 01-4.797-.4c-4.684-.634-7.341 1.433-8.044 2.081-5.518 5.093-6.586 14.092-6.596 14.183a1.977 1.977 0 01-1.96 1.757 1.97 1.97 0 01-1.63-.867c-.087-.13-2.164-3.234-3.075-7.615-1.237-5.95.238-11.407 4.266-15.783a20.702 20.702 0 018.738-5.615l-.407.106a7.99 7.99 0 00-3.375-.747h-.09l-3.032 2.983a1.965 1.965 0 01-1.382.563c-.5 0-1-.188-1.382-.563a1.9 1.9 0 010-2.719l.268-.264h-.61c-1.08 0-1.954-.86-1.954-1.922 0-1.062.875-1.922 1.954-1.922h.61l-.268-.264a1.9 1.9 0 010-2.72c.763-.75 2-.75 2.764 0l3.032 2.983h.09a11.87 11.87 0 018.661 3.726l-.217-.223a22.914 22.914 0 015.352.095c4.946.67 8.99-.018 12.113-2.052a12.215 12.215 0 01-2.71-7.7v-.092L30.6 16.287a2.034 2.034 0 010-2.812 1.885 1.885 0 012.725 0l.265.273v-.621c0-1.099.862-1.989 1.926-1.989s1.927.89 1.927 1.989v.62l.265-.272a1.885 1.885 0 012.725 0c1.146 1.183.32 2.483 0 2.812l-2.99 3.086v.091c0 1.878.635 3.673 1.771 5.098 1.412-1.686 2.522-3.808 3.325-6.36-.587-1.625-1.5-5.473.828-9.837 1.22-2.285 3.564-4.687 6.117-6.269z" /></svg>
                    </div>
                </div>
                <div data-choice="spock" className={`${styles.outterContainer} ${styles.spock}`} onClick={(e) => { setSelection("spock", e) }}>
                    <div className={styles.innerConatainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="45" height="59"><path fill="#3B4262" d="M44.042 32.422l-.863-.86c-2.062-2.054-5.433-2.5-7.95-1.06l-5.376 3.059 1.12-24.502c0-2.054-1.678-3.726-3.743-3.726-.446 0-.875.079-1.273.222l.134-1.315c0-2.077-1.705-3.767-3.798-3.767-1.936 0-3.559 1.445-3.764 3.299l-3.45 20.75c-.045.282-.536.253-.588.075L10.416 7.962a3.658 3.658 0 00-3.502-2.629c-1.118 0-2.157.501-2.853 1.375a3.592 3.592 0 00-.69 3.08l.792 3.35a3.34 3.34 0 00-1.335.168 3.447 3.447 0 00-2.326 3.818L2.9 30.85c0 5.415.953 9.423 1.754 11.83a13.61 13.61 0 01.687 4.291c0 1.284-.179 2.562-.534 3.796l-1.86 6.482c-.104.366-.03.76.198 1.065.232.304.592.483.975.483h21.97a1.218 1.218 0 001.16-1.6c-.013-.031-1.033-3.169-.067-7.437 1.225-.99 5.514-4.462 7.054-5.862 2.546-2.315 9.521-9.468 9.817-9.772a1.21 1.21 0 00-.012-1.705z" /></svg>
                    </div>
                </div>
                <svg className={styles.pentagon} xmlns="http://www.w3.org/2000/svg" width="329" height="313"><path fill="none" stroke="#000" strokeWidth="15" d="M164.5 9.27L9.26 122.06l59.296 182.495h191.888L319.74 122.06 164.5 9.271z" opacity=".2" /></svg>
            </div>
            {winner &&
                <div className={styles.result}>
                    <span>
                        {
                            winner == "player" ?
                                "you win"
                                :
                                winner == "bot" ?
                                    "you lose"
                                    :
                                    "draw"
                        }
                    </span>
                    <button onClick={() => resetGame()}>play again</button>
                </div>
            }
        </div>
        <button className={styles.rulesBtn} onClick={() => showRulesBox(true)}>Rules</button>
    </div>;
};

export default Board;
