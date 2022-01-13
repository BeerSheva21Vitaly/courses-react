import { Observable } from "rxjs";
import {getRandomInteger} from "./util/common/random";

export default class PublisherNumbers {
    numbers: Set<number> = new Set();
    getNumbers(): Observable<number[]> {
        return new Observable<number[]>(subscriber => {
            const interval = setInterval(() => {
                try {
                    const num: number = getRandomInteger(0, 10)
                    if(this.numbers.has(num)) {
                        //do nothing
                    } else {
                        this.numbers.add(num);
                        subscriber.next(Array.from(this.numbers));
                        console.log(`Published with ${num}`);
                    }
                } catch (err) {
                    //метод error() publisher'а закрывается publisher и вызывает метд error у subscriber'а
                    subscriber.error(err);
                    clearInterval(interval);
                }               
            }, 2000)
            //возвращается функция, которая будет вызвана по факту отписки от этого паблишера
            return () => clearInterval(interval);
        })
    }
}