export class Sort {
  constructor(arr, setArr, type) {
    this.arr = [...arr]
    this.index = 0
    this.iteration = 0
    this.type = type
    this.setArr = setArr
    this.isSorted = false
  }

  print() {
    console.log(this.arr.map((element) => element.value))
  }

  newArr(arr) {
    this.arr = [...arr]
    this.isSorted = false
    this.index = 0
    this.iteration = 0
  }

  setType(type, arr) {
    this.type = type
    this.arr = [...arr]
    this.isSorted = false
    this.index = 0
    this.iteration = 0
  }

  swap(arr, i1, i2) {
    let temp = { ...arr[i1] }

    arr[i1].id = arr[i2].id
    arr[i1].value = arr[i2].value

    arr[i2].id = temp.id
    arr[i2].value = temp.value
  }

  checkSorted() {
    this.isSorted = true
    for (let i = 0; i < this.arr.length - 1; i++) {
      if (this.arr[i].value > this.arr[i + 1].value) {
        this.isSorted = false
        break
      }
    }
  }

  iterate() {
    if (this.isSorted) {
      return
    }

    if (this.index === this.arr.length - 1) {
      this.index = 0
    }

    switch (this.type) {
      case 'bubble': {
        if (this.arr[this.index].value >= this.arr[this.index + 1].value) {
          const newArr = [...this.arr]
          this.swap(newArr, this.index, this.index + 1)
          this.setArr(newArr)

          this.iteration++
        }
        break
      }
      case 'selection': {
        let minIndex = this.index
        for (let i = this.index + 1; i < this.arr.length; i++) {
          if (this.arr[i].value < this.arr[minIndex].value) {
            minIndex = i
          }
          this.iteration++
        }

        const newArr = [...this.arr]
        this.swap(newArr, minIndex, this.index)
        this.setArr(newArr)
        break
      }
      case 'insertion': {
        if (this.index === 0) {
          this.index = 1
        }
        const newArr = [...this.arr]

        for (let i = this.index; i >= 0; i--) {
          this.iteration++
          if (newArr[i + 1].value < newArr[i].value) {
            this.swap(newArr, i, i + 1)
          } else {
            break
          }
        }

        this.setArr(newArr)
        break
      }
      default: {
        break
      }
    }

    this.index++
    this.checkSorted()
  }
}
