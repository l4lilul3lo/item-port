let input = "fox,bug,chicken,grass,sheep";
const whoEatsWho = (zoo) => {
  const zooAnimals =
    "antelope eats grass big-fish eats little-fish bug eats leaves bear eats big-fish bear eats bug bear eats chicken bear eats cow bear eats leaves bear eats sheep chicken eats bug cow eats grass fox eats chicken fox eats sheep giraffe eats leaves lion eats antelope lion eats cow panda eats leaves sheep eats grass";
  console.log(zooAnimals);

  let foodChain = {};
  let arr = zooAnimals.split(" ");

  for (let i = 0; i < arr.length; i += 3) {
    let predator = arr[i];
    let prey = arr[i + 2];
    foodChain[predator]
      ? foodChain[predator].push(prey)
      : (foodChain[predator] = [prey]);
  }

  console.log(foodChain);

  let splitZoo = zoo.split(",");
  let keepGoing = true;
  while (keepGoing) {
    keepGoing = false;
    let newZoo = [...splitZoo];
    console.log(`newZoo at start of loop ${newZoo}`);
    console.log(`splitZoo at start of loop ${splitZoo}`);
    for (let i = 0; i < newZoo.length; i++) {
      console.log(i);
      let left = newZoo[i - 1] === undefined ? "nothing" : newZoo[i - 1];
      let right = newZoo[i + 1] === undefined ? "nothing" : newZoo[i + 1];
      let current = newZoo[i];

      if (foodChain[current].includes(left)) {
        console.log(`${current} eats ${left}`);
        console.log(`index to start removal ${i - 1}`);
        splitZoo.splice(i - 1, 1);
        console.log(`splitZoo after splice ${splitZoo}`);
        // if an animal is eatin, set keepGoing to true and return.
        keepGoing = true;
        break;
      }

      if (foodChain[current].includes(right)) {
        console.log(`${current} eats ${right}`);
        splitZoo.splice(i + 1, 1);
        keepGoing = true;
        break;
        // if an animal is eatin, set keepGoing to true and return from foreach
      }
      if (i >= newZoo.length) {
        keepGoing = false;
      }
    }
  }
};

whoEatsWho(input);
