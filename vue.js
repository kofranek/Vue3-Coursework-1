// вы можете как угодно изменять программу и код
// добавлять любые переменные и модели
// ваша задача реализовать так, как показано на видео, чтобы оно работало
//********************
//Jiri Kofranek
//email: kofranek@gmail.com
//********************

const App = {
  data() {
    return {
      activeIndex: 0, // то, что позволяет определить текущий активный шаг
      steps: [
        {title: 'Основы', text: 'В блоке вы познакомитесь со всеми основами Vue.js на практике. На протяжении блока мы напишем реактивное приложение, в процессе разработки которого разберем вся базу фреймворка.'},
        {title: 'Компоненты', text: 'Один из самых важных блоков в курсе, где вы узнаете все о компонентах. В блоке мы напишем 2 разных приложения и создадим более 5 различных UI компонентов как в реальной разработке. Блок расскажет про абсолютно все составляющие, которые есть в компонентах: взаимодействие, slots, асинхронные и динамические компоненты и тонна примеров.'},
        {title: 'Роутер', text: 'В данном блоке вы узнаете все о том, как работает мультиязычность во Vue. Мы создадим миниклон Gmail в данном блоке, где вы на практике увидите как работать с динамическим роутером.'},
        {title: 'Vuex', text: 'В блоке вы узнаете абсолютно все про Vuex. Вы узнаете как работать с данными, какие есть лучшие практики по их программированию и структурированию. Все на практике.'},
        {title: 'Composition', text: 'Одним из наиболее важных обновлений в Vue 3 является появление альтернативного синтаксиса Composition API. В этом блоке вы узнаете все, чтобы полностью пользоваться данными синтаксисом на практических примерах. Помимо этого вы узнаете как работать совместно с Vue Router и Vuex.'},
      ],
      end:false,
      firstButtonText:'Назад',
      secondButtonText:'Вперед'
    }
  },
  methods: {
    prev() {
      // когда нажимаем кнопку назад
      if(this.end){
        this.reset()
      }
      else if(this.activeIndex>0){
        this.activeIndex--
      }
    },
    reset() {
      // начать заново
      this.end=false
      this.activeIndex=0
      this.firstButtonText='Назад'

    },
    nextOrFinish() {
      // кнопка вперед или закончить
      if (!this.lastStep){
        this.activeIndex++
      }
      else{
        this.end=true;
        this.firstButtonText='Начать заново'
      }
    },
    setActive(idx) {
      // когда нажимаем на определенный шаг
      this.activeIndex=idx
      this.end=false
      this.firstButtonText='Назад'
    }
  },
  computed: {
    // тут стоит определить несколько свойств:
    // 1. текущий выбранный шаг
    stepSelected(){
      console.log('stepSelected',this.activeIndex)
      return this.activeIndex
    },
    // 2. выключена ли кнопка назад

    // 3. находимся ли мы на последнем шаге
    lastStep(){
      return this.activeIndex===this.steps.length-1
    }
  },
  template:`
  <div class="container">
    <div class="card">
      <h1>План по изучению Vue.js</h1>
  
      <div class="steps">
        <div class="steps-content">
          {{steps[stepSelected].text}}
        </div>
        <ul class="steps-list">
          <li
              :class="{
                  'steps-item':index>activeIndex,
                  'steps-item done':index<activeIndex,
                  'steps-item active':index===activeIndex,
                }"
              @click="setActive(index)"
              v-for="(item,index) in steps"
          >
            <span>{{index + 1}}</span>{{steps[index].title}}
          </li>
        </ul>
        <div>
          <button v-if="activeIndex>0" class="btn" @click="prev">{{firstButtonText}}</button>
          <button v-else disabled class="btn disabled" @click="prev">{{firstButtonText}}</button>
  
          <button v-if="!lastStep" class="btn primary" @click="nextOrFinish">Вперед</button>
          <button v-else-if="!end" class="btn primary" @click="nextOrFinish">Закончить</button>
  
        </div>
      </div>
    </div>
  </div>
  
  `
}

Vue.createApp(App).mount('#app')