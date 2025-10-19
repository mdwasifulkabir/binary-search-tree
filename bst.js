class Node {
  constructor(data) {
    this.data = data 
    this.left = null
    this.right = null
  }
}

class Tree {
  constructor(arr) {
    this.root = buildTree(arr)
  }

  prettyPrint = (node = this.root, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
    if (node.left !== null) {
      this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };
}

function buildTree(arr, start, end) {
  //remove duplicates and sort
  arr = [...new Set(arr)]
  arr.sort((a, b) => a - b)
  return createBST(arr, 0, arr.length - 1)
}

function createBST(arr, start, end) {
  if (start > end) return null
  let mid = Math.floor((start + end) / 2)
  const root = new Node(arr[mid])

  root.left = createBST(arr, start, mid-1)
  root.right = createBST(arr, mid+1, end)

  return root
}

//main
arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]
bst = new Tree(arr, 0, arr.length - 1)
bst.prettyPrint()