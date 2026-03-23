"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ── THEMES ───────────────────────────────────────────────────────
const DARK  = { bg:"#060610",surface:"#0d0d1f",card:"#11112a",border:"#1e1e3c",accent:"#00ff9f",accent2:"#818cf8",text:"#dde1f5",muted:"#5a5a7a",success:"#00e676",error:"#ff5252",warn:"#ffd740",edbg:"#08081a",edtx:"#c8cce8",outbg:"#050512" };
const LIGHT = { bg:"#f4f6fb",surface:"#ffffff",card:"#f0f3fa",border:"#dde2f0",accent:"#2563eb",accent2:"#7c3aed",text:"#1a1d2e",muted:"#6b7280",success:"#059669",error:"#dc2626",warn:"#d97706",edbg:"#1e1e2e",edtx:"#c8cce8",outbg:"#13131f" };
const F = { code:'"JetBrains Mono",monospace', head:'"Space Mono",monospace', body:'"IBM Plex Sans",sans-serif' };

// ── CURRICULUM METADATA ─────────────────────────────────────────
const PHASES = [
{ id:0, emoji:"📖", title:"Write Great Code", color:"#10b981", levels:[
  { title:"How Computers Actually Work", xp:100, time:"40 min", diff:"Beginner", topic:"binary numbers, bits and bytes, how memory works, why array lookup is O(1), pointers in Python", starter:`def to_binary(n: int) -> str:
    """Convert n to binary string WITHOUT using bin()."""
    if n == 0: return "0"
    bits = []
    while n > 0:
        bits.append(str(n % 2))
        n //= 2
    return ''.join(reversed(bits))

def count_ones(n: int) -> int:
    """Count 1-bits using bitwise operations."""
    count = 0
    while n:
        count += n & 1
        n >>= 1
    return count

print(to_binary(5))    # "101"
print(to_binary(255))  # "11111111"
print(count_ones(7))   # 3` },
  { title:"Memory, Variables & References", xp:120, time:"45 min", diff:"Beginner", topic:"Python memory model, mutable vs immutable, shallow vs deep copy, the mutable default argument bug, why strings are immutable", starter:`import copy

def collect(item, results=None):
    # Bug fixed: mutable default argument
    if results is None: results = []
    results.append(item)
    return results

def zero_row(matrix):
    # Bug fixed: deep copy to avoid mutating original
    m = copy.deepcopy(matrix)
    m[0] = [0] * len(m[0])
    return m

def join_words(words):
    # Bug fixed: O(n) join instead of O(n²) concatenation
    return ' '.join(words)

print(collect("a"))           # ["a"]
print(collect("b"))           # ["b"] not ["a","b"]
m = [[1,2],[3,4]]
print(zero_row(m))            # [[0,0],[3,4]]
print(m)                      # [[1,2],[3,4]] unchanged
print(join_words(["hello","world"]))  # "hello world"` },
  { title:"Functions, Call Stack & Recursion", xp:150, time:"50 min", diff:"Beginner", topic:"call stack frames, base case, recursive case, stack overflow, memoization with lru_cache, recursion vs iteration trade-offs", starter:`from functools import lru_cache

def fib_naive(n: int) -> int:
    """O(2^n) - understand why, then never use this."""
    if n <= 1: return n
    return fib_naive(n-1) + fib_naive(n-2)

@lru_cache(maxsize=None)
def fib_memo(n: int) -> int:
    """O(n) time/space - memoized."""
    if n <= 1: return n
    return fib_memo(n-1) + fib_memo(n-2)

def fib_iter(n: int) -> int:
    """O(n) time, O(1) space - production solution."""
    if n <= 1: return n
    a, b = 0, 1
    for _ in range(n - 1): a, b = b, a + b
    return b

for i in [0,1,6,10,20]:
    print(f"fib({i}) = {fib_iter(i)}")` },
]},
{ id:1, emoji:"🐍", title:"Python Mastery", color:"#00e676", levels:[
  { title:"Python for JS Developers", xp:150, time:"45 min", diff:"Beginner", topic:"Python vs JavaScript syntax side by side, list comprehensions, enumerate, zip, f-strings, tuple unpacking, no var/let/const", starter:`def fizzbuzz_loop(n: int) -> list:
    result = []
    for i in range(1, n+1):
        if i % 15 == 0: result.append("FizzBuzz")
        elif i % 3 == 0: result.append("Fizz")
        elif i % 5 == 0: result.append("Buzz")
        else: result.append(str(i))
    return result

def fizzbuzz_oneliner(n: int) -> list:
    return ["FizzBuzz" if x%15==0 else "Fizz" if x%3==0
            else "Buzz" if x%5==0 else str(x) for x in range(1, n+1)]

print(fizzbuzz_loop(15))
print(fizzbuzz_oneliner(15))` },
  { title:"Python Data Structures Deep Dive", xp:200, time:"60 min", diff:"Beginner", topic:"list vs deque, dict and defaultdict, Counter, set operations, heapq module, time complexity of each operation", starter:`from collections import defaultdict, Counter
import heapq

def two_sum_brute(nums: list, target: int) -> list:
    """O(n²) - nested loops baseline."""
    for i in range(len(nums)):
        for j in range(i+1, len(nums)):
            if nums[i] + nums[j] == target: return [i, j]
    return []

def two_sum(nums: list, target: int) -> list:
    """O(n) - hash map. For each num check if complement exists."""
    seen = {}
    for i, n in enumerate(nums):
        if target - n in seen: return [seen[target-n], i]
        seen[n] = i
    return []

print(two_sum([2,7,11,15], 9))   # [0,1]
print(two_sum([3,3], 6))         # [0,1]` },
  { title:"OOP, Type Hints & Clean Code", xp:200, time:"60 min", diff:"Intermediate", topic:"Python classes, __init__, type hints from typing module, docstrings, heapq, designing clean APIs that Anthropic expects", starter:`from typing import Optional, List

class MinStack:
    def __init__(self) -> None:
        self.stack: List[int] = []
        self.min_stack: List[int] = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        curr_min = min(val, self.min_stack[-1]) if self.min_stack else val
        self.min_stack.append(curr_min)

    def pop(self) -> None:
        self.stack.pop(); self.min_stack.pop()

    def top(self) -> int: return self.stack[-1]
    def get_min(self) -> int: return self.min_stack[-1]

s = MinStack()
s.push(-2); s.push(0); s.push(-3)
print(s.get_min())   # -3
s.pop()
print(s.top())       # 0
print(s.get_min())   # -2` },
  { title:"Advanced Python Patterns", xp:220, time:"60 min", diff:"Intermediate", topic:"prefix sums for O(1) range queries, generators, sorting with custom keys, itertools, group anagrams pattern", starter:`from collections import defaultdict
from typing import List

def group_anagrams(strs: List[str]) -> List[List[str]]:
    """O(n*k*logk) where k=max string length."""
    groups: dict = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))   # "eat"→('a','e','t') — hashable key
        groups[key].append(s)
    return list(groups.values())

print(group_anagrams(["eat","tea","tan","ate","nat","bat"]))
print(group_anagrams([""]))
print(group_anagrams(["a"]))` },
]},
{ id:2, emoji:"🏗️", title:"Data Structures", color:"#818cf8", levels:[
  { title:"Arrays, Two Pointers & Sliding Window", xp:200, time:"60 min", diff:"Beginner", topic:"two-pointer technique, sliding window pattern, Kadane's algorithm for max subarray, when to use each pattern", starter:`def max_area(height: list) -> int:
    """LeetCode #11 - Container With Most Water. O(n) two pointers."""
    left, right = 0, len(height)-1
    max_water = 0
    while left < right:
        area = min(height[left], height[right]) * (right - left)
        max_water = max(max_water, area)
        if height[left] < height[right]: left += 1
        else: right -= 1
    return max_water

print(max_area([1,8,6,2,5,4,8,3,7]))  # 49
print(max_area([1,1]))                  # 1` },
  { title:"Linked Lists", xp:230, time:"70 min", diff:"Intermediate", topic:"ListNode class, reverse a linked list, Floyd's cycle detection, find middle node, dummy head pattern, merge two sorted lists", starter:`class ListNode:
    def __init__(self, val=0, next=None): self.val=val; self.next=next

def merge_two_lists(l1: ListNode, l2: ListNode) -> ListNode:
    dummy = ListNode(0); curr = dummy
    while l1 and l2:
        if l1.val <= l2.val: curr.next=l1; l1=l1.next
        else: curr.next=l2; l2=l2.next
        curr = curr.next
    curr.next = l1 or l2
    return dummy.next

def to_list(h):
    r=[]
    while h: r.append(h.val); h=h.next
    return r
def from_list(a):
    d=ListNode(); c=d
    for v in a: c.next=ListNode(v); c=c.next
    return d.next

print(to_list(merge_two_lists(from_list([1,3,5]), from_list([2,4,6]))))` },
  { title:"Stacks & Queues", xp:220, time:"60 min", diff:"Intermediate", topic:"stack LIFO pattern, valid parentheses, monotonic stack for next greater element, deque for O(1) queue operations", starter:`def is_valid(s: str) -> bool:
    """LeetCode #20 - Valid Parentheses."""
    stack = []
    pairs = {')':'(', ']':'[', '}':'{'}
    for c in s:
        if c in '([{': stack.append(c)
        elif not stack or stack[-1] != pairs[c]: return False
        else: stack.pop()
    return len(stack) == 0

print(is_valid("()"))       # True
print(is_valid("()[]{}"))   # True
print(is_valid("(]"))       # False
print(is_valid("{[]}"))     # True` },
  { title:"Trees & Binary Search Trees", xp:280, time:"80 min", diff:"Intermediate", topic:"TreeNode class, DFS inorder/preorder/postorder, BFS level order with deque, BST properties, validate BST with range checking", starter:`class TreeNode:
    def __init__(self,val=0,left=None,right=None):
        self.val=val;self.left=left;self.right=right

def is_valid_bst(root) -> bool:
    def validate(node, lo, hi):
        if not node: return True
        if node.val <= lo or node.val >= hi: return False
        return (validate(node.left, lo, node.val) and
                validate(node.right, node.val, hi))
    return validate(root, float('-inf'), float('inf'))

def build(arr, i=0):
    if i>=len(arr) or arr[i] is None: return None
    n=TreeNode(arr[i]); n.left=build(arr,2*i+1); n.right=build(arr,2*i+2); return n

print(is_valid_bst(build([2,1,3])))               # True
print(is_valid_bst(build([5,1,4,None,None,3,6]))) # False` },
  { title:"Graphs: BFS, DFS & Union-Find", xp:300, time:"90 min", diff:"Intermediate", topic:"adjacency list, grid as graph, DFS template, BFS shortest path, Union-Find with path compression, Number of Islands", starter:`def num_islands(grid: list) -> int:
    """LeetCode #200 - DFS on a grid."""
    if not grid: return 0
    rows, cols = len(grid), len(grid[0])
    count = 0

    def dfs(r, c):
        if r<0 or r>=rows or c<0 or c>=cols or grid[r][c]!='1': return
        grid[r][c] = '0'  # Sink = mark visited
        dfs(r+1,c); dfs(r-1,c); dfs(r,c+1); dfs(r,c-1)

    for r in range(rows):
        for c in range(cols):
            if grid[r][c] == '1': dfs(r,c); count+=1
    return count

g1=[["1","1","0"],["1","1","0"],["0","0","1"]]
g2=[["1","1","0"],["1","0","0"],["0","0","1"]]
print(num_islands(g1))  # 2
print(num_islands(g2))  # 3` },
]},
{ id:3, emoji:"⚡", title:"Algorithms", color:"#fbbf24", levels:[
  { title:"Sorting Algorithms", xp:220, time:"70 min", diff:"Intermediate", topic:"Python's built-in sort (Timsort), merge sort implementation, quick select, Dutch National Flag 3-way partition, sort by custom key", starter:`def sort_colors(nums: list) -> None:
    """LeetCode #75 - Dutch National Flag. O(n) time O(1) space."""
    low, mid, high = 0, 0, len(nums)-1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1; mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1  # Don't increment mid!

n1=[2,0,2,1,1,0]; sort_colors(n1); print(n1)  # [0,0,1,1,2,2]
n2=[2,0,1];        sort_colors(n2); print(n2)  # [0,1,2]` },
  { title:"Binary Search Mastery", xp:250, time:"70 min", diff:"Intermediate", topic:"binary search template, lower bound, binary search on answer space (not just arrays), rotated sorted array, time complexity analysis", starter:`def search(nums: list, target: int) -> int:
    """LeetCode #33 - Search in Rotated Sorted Array. O(log n)."""
    left, right = 0, len(nums)-1
    while left <= right:
        mid = (left+right)//2
        if nums[mid] == target: return mid
        if nums[left] <= nums[mid]:   # Left half sorted
            if nums[left] <= target < nums[mid]: right = mid-1
            else: left = mid+1
        else:                          # Right half sorted
            if nums[mid] < target <= nums[right]: left = mid+1
            else: right = mid-1
    return -1

print(search([4,5,6,7,0,1,2], 0))   # 4
print(search([4,5,6,7,0,1,2], 3))   # -1
print(search([1], 0))               # -1` },
  { title:"Recursion & Backtracking", xp:280, time:"80 min", diff:"Advanced", topic:"backtracking template CHOOSE/UNCHOOSE, subsets, permutations, combination sum, pruning, time O(branching^depth)", starter:`def combination_sum(candidates: list, target: int) -> list:
    """LeetCode #39 - each candidate reusable unlimited times."""
    result = []
    candidates.sort()
    def backtrack(start, curr, remaining):
        if remaining == 0: result.append(curr[:]); return
        for i in range(start, len(candidates)):
            if candidates[i] > remaining: break  # Pruning
            curr.append(candidates[i])
            backtrack(i, curr, remaining-candidates[i])  # i not i+1 = reuse
            curr.pop()
    backtrack(0, [], target)
    return result

print(combination_sum([2,3,6,7], 7))    # [[2,2,3],[7]]
print(combination_sum([2,3], 6))        # [[2,2,2],[3,3]]` },
  { title:"Dynamic Programming", xp:400, time:"120 min", diff:"Advanced", topic:"DP framework: Define-Relate-Base-Answer, coin change, climbing stairs as Fibonacci, 2D DP for LCS, top-down memoization vs bottom-up tabulation", starter:`def coin_change(coins: list, amount: int) -> int:
    # Define: dp[i] = min coins to make amount i
    # Base:   dp[0] = 0
    # Relate: dp[i] = min(dp[i-c]+1 for c in coins if c<=i)
    dp = [float('inf')] * (amount+1); dp[0] = 0
    for i in range(1, amount+1):
        for coin in coins:
            if coin <= i: dp[i] = min(dp[i], dp[i-coin]+1)
    return dp[amount] if dp[amount] != float('inf') else -1

def climb_stairs(n: int) -> int:
    # Define: dp[i] = ways to reach step i
    # It's Fibonacci! O(n) time, O(1) space
    if n <= 2: return n
    a, b = 1, 2
    for _ in range(n-2): a, b = b, a+b
    return b

print(coin_change([1,5,11], 15))   # 3
for i in range(1,8): print(f"stairs({i})={climb_stairs(i)}", end=" ")` },
  { title:"Greedy Algorithms & Intervals", xp:260, time:"70 min", diff:"Advanced", topic:"greedy strategy, proof of correctness, jump game, meeting rooms, merge intervals, activity selection", starter:`def merge(intervals: list) -> list:
    """LeetCode #56 - Merge Intervals. Sort then sweep."""
    if not intervals: return []
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)  # Extend
        else:
            merged.append([start, end])              # New interval
    return merged

print(merge([[1,3],[2,6],[8,10],[15,18]]))  # [[1,6],[8,10],[15,18]]
print(merge([[1,4],[4,5]]))                 # [[1,5]]` },
]},
{ id:4, emoji:"🏛️", title:"System Design", color:"#f43f5e", levels:[
  { title:"System Design Framework & Scale Math", xp:400, time:"120 min", diff:"Advanced", topic:"RADIO framework, back-of-envelope calculations, SQL vs NoSQL decision, CAP theorem, caching strategies, consistent hashing basics", starter:`import time

class RateLimiter:
    """Token Bucket Rate Limiter - used in Anthropic's API."""
    def __init__(self, capacity: int, refill_rate: float):
        self.capacity = capacity; self.refill_rate = refill_rate
        self.tokens = float(capacity); self.last_refill = time.time()

    def _refill(self) -> None:
        now = time.time()
        self.tokens = min(self.capacity,
                         self.tokens + (now-self.last_refill)*self.refill_rate)
        self.last_refill = now

    def allow_request(self) -> bool:
        self._refill()
        if self.tokens >= 1: self.tokens -= 1; return True
        return False

limiter = RateLimiter(capacity=5, refill_rate=2)
for i in range(8):
    print(f"Request {i+1}: {'✓' if limiter.allow_request() else '✗'}")` },
  { title:"URL Shortener Deep Dive", xp:400, time:"90 min", diff:"Advanced", topic:"RADIO applied to URL shortener, MD5 hashing, base64 encoding, 301 vs 302 redirects, database schema, Redis caching layer, horizontal scaling", starter:`import hashlib, base64

class URLShortener:
    def __init__(self): self.db={}; self.reverse={}

    def _generate_code(self, url: str) -> str:
        """MD5 hash → base64 → first 7 chars = 62^7 ≈ 3.5T unique codes."""
        h = hashlib.md5(url.encode()).digest()
        return base64.urlsafe_b64encode(h).decode()[:7]

    def shorten(self, url: str) -> str:
        if url in self.reverse: return self.reverse[url]  # Idempotent
        code = self._generate_code(url)
        self.db[code]=url; self.reverse[url]=code; return code

    def retrieve(self, code: str) -> str:
        return self.db.get(code, "404 Not Found")

s = URLShortener()
code = s.shorten("https://anthropic.com/research/constitutional-ai")
print(f"Code: {code}  (len={len(code)})")
print(f"Retrieved: {s.retrieve(code)[:50]}")
print(f"Idempotent: {s.shorten('https://anthropic.com/research/constitutional-ai')==code}")` },
  { title:"LRU Cache — The Anthropic Favorite", xp:450, time:"100 min", diff:"Expert", topic:"LRU eviction policy, doubly linked list for O(1) insert/remove, hash map for O(1) lookup, dummy sentinel nodes, cache consistency", starter:`class Node:
    def __init__(self,k=0,v=0): self.key=k;self.val=v;self.prev=self.next=None

class LRUCache:
    def __init__(self, capacity: int):
        self.cap=capacity; self.cache={}
        self.head=Node(); self.tail=Node()  # Dummy sentinels
        self.head.next=self.tail; self.tail.prev=self.head

    def _remove(self, node):
        node.prev.next=node.next; node.next.prev=node.prev

    def _insert_mru(self, node):
        node.prev=self.tail.prev; node.next=self.tail
        self.tail.prev.next=node; self.tail.prev=node

    def get(self, key: int) -> int:
        if key not in self.cache: return -1
        n=self.cache[key]; self._remove(n); self._insert_mru(n); return n.val

    def put(self, key: int, val: int) -> None:
        if key in self.cache: self._remove(self.cache[key])
        n=Node(key,val); self.cache[key]=n; self._insert_mru(n)
        if len(self.cache)>self.cap:
            lru=self.head.next; self._remove(lru); del self.cache[lru.key]

c=LRUCache(2); c.put(1,1); c.put(2,2)
print(c.get(1))   # 1
c.put(3,3); print(c.get(2))  # -1
print(c.get(3))   # 3` },
]},
{ id:5, emoji:"🎯", title:"Mock Interviews", color:"#a855f7", levels:[
  { title:"Anthropic Technical Screen", xp:500, time:"60 min", diff:"Expert", topic:"Anthropic's 5 evaluation dimensions, 45-minute protocol, production code quality standards, type hints and docstrings requirement, thinking aloud", starter:`def word_search(board: list, word: str) -> bool:
    """LeetCode #79 - DFS + Backtracking on grid."""
    rows, cols = len(board), len(board[0])
    def dfs(r, c, idx):
        if idx == len(word): return True
        if r<0 or r>=rows or c<0 or c>=cols: return False
        if board[r][c] != word[idx]: return False
        temp = board[r][c]; board[r][c] = '#'  # Mark visited
        found = (dfs(r+1,c,idx+1) or dfs(r-1,c,idx+1) or
                 dfs(r,c+1,idx+1) or dfs(r,c-1,idx+1))
        board[r][c] = temp  # Unmark (backtrack)
        return found
    for r in range(rows):
        for c in range(cols):
            if dfs(r,c,0): return True
    return False

b=[["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]]
print(word_search([r[:] for r in b],"ABCCED"))  # True
print(word_search([r[:] for r in b],"SEE"))     # True
print(word_search([r[:] for r in b],"ABCB"))    # False` },
  { title:"Google Full Mock Round", xp:600, time:"90 min", diff:"Expert", topic:"Google's interview structure, scalability thinking, Top K Frequent Elements with bucket sort, explaining multiple approaches, never silent for 60+ seconds", starter:`from collections import Counter
import heapq

def top_k_sort(nums: list, k: int) -> list:
    """O(n log n) - count then sort by frequency."""
    count = Counter(nums)
    return sorted(count, key=count.get, reverse=True)[:k]

def top_k_heap(nums: list, k: int) -> list:
    """O(n log k) - min-heap of size k."""
    count = Counter(nums)
    return heapq.nlargest(k, count.keys(), key=count.get)

def top_k_bucket(nums: list, k: int) -> list:
    """O(n) - bucket sort by frequency. Max freq = n."""
    count = Counter(nums)
    freq = [[] for _ in range(len(nums)+1)]
    for n, c in count.items(): freq[c].append(n)
    result = []
    for bucket in reversed(freq):
        result.extend(bucket)
        if len(result) >= k: return result[:k]
    return result

print(top_k_bucket([1,1,1,2,2,3], 2))  # [1,2]
print(top_k_bucket([1], 1))             # [1]` },
  { title:"Meta Full Mock Round", xp:600, time:"90 min", diff:"Expert", topic:"Meta's interview rubric Exceptional/Strong/Mixed, product sense in code, Product of Array Except Self two-pass O(n) O(1) space, social graph problems", starter:`def product_except_self(nums: list) -> list:
    """LeetCode #238 - No division. O(n) time, O(1) extra space.
    Pass 1 (left→right): result[i] = product of all elements LEFT of i
    Pass 2 (right→left): multiply by product of all elements RIGHT of i
    """
    n = len(nums)
    result = [1] * n
    prefix = 1
    for i in range(n):
        result[i] = prefix
        prefix *= nums[i]
    suffix = 1
    for i in range(n-1, -1, -1):
        result[i] *= suffix
        suffix *= nums[i]
    return result

print(product_except_self([1,2,3,4]))       # [24,12,8,6]
print(product_except_self([-1,1,0,-3,3]))   # [0,0,9,0,0]` },
]},
];

const TOTAL_LEVELS = PHASES.reduce((s,p)=>s+p.levels.length,0);
const TOTAL_XP = PHASES.reduce((s,p)=>p.levels.reduce((ss,l)=>ss+l.xp,s),0);

const RANKS = [
  {min:0,title:"Intern 👶",next:800},{min:800,title:"Junior Eng 🌱",next:2000},
  {min:2000,title:"Mid-Level 💻",next:4000},{min:4000,title:"Senior Eng 🚀",next:6500},
  {min:6500,title:"Staff Eng ⭐",next:9500},{min:9500,title:"Principal 🏆",next:99999},
];
const getRank = xp => RANKS.filter(r=>xp>=r.min).pop();

const JOB_TIERS = [
  {min:0,  label:"Keep Building",   color:"#ef4444", positions:[], advice:"Complete Python foundations and at least 10 Data Structure levels before applying anywhere."},
  {min:22, label:"Junior Ready",    color:"#f59e0b", positions:["Junior Frontend (JS)","Junior Backend","Bootcamp TA"], advice:"Ready for junior roles at small startups. Finish Algorithms before FAANG."},
  {min:42, label:"Mid-Level Ready", color:"#eab308", positions:["Software Engineer (Mid)","Startup SWE","API Engineer"], advice:"Apply to Series A/B startups and FAANG new grad roles now."},
  {min:62, label:"Senior Candidate",color:"#22c55e", positions:["Senior SWE — Google L5","Senior SWE — Meta E5","SWE — Stripe"], advice:"Apply to senior roles. Complete System Design fully before Anthropic."},
  {min:80, label:"FAANG Ready ✓",   color:"#10b981", positions:["Senior SWE — Google","Staff — Meta","Senior SWE — Amazon","SWE — Anthropic (Infra)"], advice:"Strong candidate. Apply now. System Design + mocks are your last mile."},
  {min:94, label:"Anthropic Ready 🎯",color:"#00bcd4",positions:["Software Engineer — Anthropic","Senior SWE — Google DeepMind","Research Engineer — OpenAI","Staff Eng — Meta AI"], advice:"You're ready. Apply to Anthropic this week. Your preparation matches what they look for."},
];
const getJobReadiness = (xp,done) => {
  const score = Math.round(((xp/TOTAL_XP)*50) + ((Object.keys(done).length/TOTAL_LEVELS)*50));
  return { score, ...JOB_TIERS.filter(t=>score>=t.min).pop() };
};

// ── TYPING TRAINER DATA ──────────────────────────────────────────
const TYPING_SNIPPETS = [
  {label:"Two Sum",code:`def two_sum(nums, target):\n    seen = {}\n    for i, n in enumerate(nums):\n        if target - n in seen:\n            return [seen[target - n], i]\n        seen[n] = i\n    return []`},
  {label:"BFS Template",code:`from collections import deque\n\ndef bfs(graph, start):\n    visited = {start}\n    queue = deque([start])\n    while queue:\n        node = queue.popleft()\n        for nb in graph[node]:\n            if nb not in visited:\n                visited.add(nb)\n                queue.append(nb)\n    return visited`},
  {label:"Binary Search",code:`def binary_search(nums, target):\n    left, right = 0, len(nums) - 1\n    while left <= right:\n        mid = (left + right) // 2\n        if nums[mid] == target: return mid\n        elif nums[mid] < target: left = mid + 1\n        else: right = mid - 1\n    return -1`},
  {label:"DFS Tree",code:`def max_depth(root):\n    if not root: return 0\n    return 1 + max(\n        max_depth(root.left),\n        max_depth(root.right)\n    )`},
  {label:"Merge Intervals",code:`def merge(intervals):\n    intervals.sort(key=lambda x: x[0])\n    merged = [intervals[0]]\n    for s, e in intervals[1:]:\n        if s <= merged[-1][1]:\n            merged[-1][1] = max(merged[-1][1], e)\n        else:\n            merged.append([s, e])\n    return merged`},
];

// ── AI LESSON GENERATOR ──────────────────────────────────────────
async function generateLesson(phase, level) {
  const prompt = `You are Professor Chen, a legendary Stanford CS professor who has helped hundreds of students ace FAANG and Anthropic interviews. You are brilliant, warm, and Socratic.

Generate a structured coding lesson about: **${level.topic}**
This is for Phase "${phase.title}", Level "${level.title}".
The student is a complete Python beginner (knows JavaScript well).

Format your response in EXACTLY this structure:

# ${level.title}

[2-3 sentence motivating intro — why this matters in interviews]

## [First Key Concept]

[Explanation + Python code block]

## [Second Key Concept]

[Explanation + code block]

## [Third Key Concept or Interview Pattern]

[Explanation + code block]

## Professor's Interview Tips

[2-3 bullet points of what interviewers actually look for regarding this topic]

Keep it focused and practical. All code must be valid Python 3. Use type hints. Total length: 350-500 words.`;

  const res = await fetch("/api/claude", {
    method: "POST", headers: {"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:1000,
      messages:[{role:"user", content:prompt}] })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Error loading lesson. Please try again.";
}

async function generateChallenge(phase, level) {
  const prompt = `You are Professor Chen, Stanford CS professor. Create a coding challenge for: **${level.topic}**
Phase: "${phase.title}", Level: "${level.title}". Student knows JavaScript, learning Python.

Format EXACTLY as follows (use these exact headers):

### Challenge Title

**Difficulty context** (1-2 sentences on why this problem matters in real interviews)

\`\`\`
example_input  →  expected_output
another_input  →  expected_output
\`\`\`

**Requirements:**
- Requirement 1 (time/space complexity target)
- Requirement 2

### Hints

1. First hint (gentle nudge, not the answer)
2. Second hint (more specific)
3. Third hint (almost there)

Keep it focused on the topic: ${level.topic}. Challenge must be solvable in 15-25 minutes.`;

  const res = await fetch("/api/claude", {
    method:"POST", headers:{"Content-Type":"application/json"},
    body: JSON.stringify({ model:"claude-sonnet-4-20250514", max_tokens:600,
      messages:[{role:"user",content:prompt}] })
  });
  const data = await res.json();
  return data.content?.[0]?.text || "Error loading challenge.";
}

// ── MARKDOWN RENDERER ────────────────────────────────────────────
function MD({ text, T }) {
  if (!text) return null;
  const lines = text.split('\n');
  const els = []; let codeLines = []; let inCode = false; let key = 0;
  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        els.push(<pre key={key++} style={{background:T.edbg,border:`1px solid ${T.border}`,borderRadius:6,padding:"12px 16px",fontFamily:F.code,fontSize:12,lineHeight:1.65,overflowX:"auto",margin:"10px 0",color:T.edtx,whiteSpace:"pre"}}>{codeLines.join('\n')}</pre>);
        codeLines=[]; inCode=false;
      } else inCode=true;
    } else if (inCode) { codeLines.push(line); }
    else if (line.startsWith('# ')) els.push(<h1 key={key++} style={{fontFamily:F.head,fontSize:15,color:T.accent,margin:"0 0 12px",letterSpacing:"0.02em"}}>{line.slice(2)}</h1>);
    else if (line.startsWith('## ')) els.push(<h2 key={key++} style={{fontFamily:F.head,fontSize:13,color:T.text,margin:"18px 0 7px"}}>{line.slice(3)}</h2>);
    else if (line.startsWith('### ')) els.push(<h3 key={key++} style={{fontSize:14,fontWeight:700,color:T.text,margin:"14px 0 6px"}}>{line.slice(4)}</h3>);
    else if (line.match(/^[-*] /)) {
      const html = line.slice(2).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,`<code style="background:${T.edbg};padding:1px 5px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:11px;color:${T.edtx}">$1</code>`);
      els.push(<div key={key++} style={{display:"flex",gap:8,margin:"3px 0",fontSize:13,lineHeight:1.7}}><span style={{color:T.accent,flexShrink:0}}>›</span><span dangerouslySetInnerHTML={{__html:html}}/></div>);
    }
    else if (line.match(/^\d+\. /)) {
      const html = line.replace(/^\d+\.\s*/,'').replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,`<code style="background:${T.edbg};padding:1px 5px;border-radius:3px;font-size:11px;color:${T.edtx}">$1</code>`);
      els.push(<div key={key++} style={{display:"flex",gap:8,margin:"3px 0",fontSize:13,lineHeight:1.7}}><span style={{color:T.accent2,flexShrink:0,minWidth:16}}>•</span><span dangerouslySetInnerHTML={{__html:html}}/></div>);
    }
    else if (line.trim()==='') els.push(<div key={key++} style={{height:5}}/>);
    else if (line.trim()) {
      const html = line.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,`<code style="background:${T.edbg};padding:1px 5px;border-radius:3px;font-size:11px;color:${T.edtx}">$1</code>`).replace(/\[([^\]]+)\]\((https?:[^)]+)\)/g,`<a href="$2" target="_blank" style="color:${T.accent}">$1 ↗</a>`);
      els.push(<p key={key++} style={{margin:"3px 0",fontSize:13,color:T.text,lineHeight:1.8}} dangerouslySetInnerHTML={{__html:html}}/>);
    }
  }
  return <div>{els}</div>;
}

// ── TYPING TRAINER ────────────────────────────────────────────────
function TypingTrainer({ T }) {
  const [idx,setIdx]=useState(0); const [typed,setTyped]=useState(''); const [started,setStarted]=useState(false);
  const [t0,setT0]=useState(null); const [done,setDone]=useState(false); const [wpm,setWpm]=useState(0); const [acc,setAcc]=useState(0);
  const snippet=TYPING_SNIPPETS[idx].code;
  const reset=()=>{setTyped('');setStarted(false);setT0(null);setDone(false);setWpm(0);setAcc(0);};
  useEffect(()=>{reset();},[idx]);
  const handleKey=useCallback((e)=>{
    if(done)return;
    if(!started){setStarted(true);setT0(Date.now());}
    const k=e.key;
    if(k==='Backspace'){setTyped(t=>t.slice(0,-1));return;}
    if(k.length!==1&&k!=='Enter'&&k!=='Tab')return;
    e.preventDefault();
    const ch=k==='Enter'?'\n':k==='Tab'?'    ':k;
    setTyped(t=>{
      const next=t+ch;
      if(next===snippet){
        const mins=(Date.now()-t0)/60000;
        setWpm(Math.round(snippet.split(/\s+/).length/mins));
        let ok=0; for(let i=0;i<next.length;i++) if(next[i]===snippet[i])ok++;
        setAcc(Math.round(ok/snippet.length*100)); setDone(true);
      }
      return next;
    });
  },[done,started,snippet,t0]);
  useEffect(()=>{window.addEventListener('keydown',handleKey);return()=>window.removeEventListener('keydown',handleKey);},[handleKey]);
  const progress=Math.min(100,Math.round(typed.length/snippet.length*100));
  return(
    <div style={{padding:24,maxWidth:800,margin:'0 auto'}}>
      <h2 style={{fontFamily:F.head,fontSize:17,color:T.accent,marginBottom:4}}>⌨️ Code Typing Trainer</h2>
      <p style={{fontSize:13,color:T.muted,marginBottom:18}}>Target: 60+ WPM with symbols. The faster you type, the more time you have to think.</p>
      <div style={{display:'flex',gap:8,marginBottom:18,flexWrap:'wrap'}}>
        {TYPING_SNIPPETS.map((s,i)=>(
          <button key={i} onClick={()=>setIdx(i)} style={{padding:'5px 12px',fontSize:12,borderRadius:5,border:`1px solid ${i===idx?T.accent:T.border}`,background:i===idx?`${T.accent}12`:'transparent',color:i===idx?T.accent:T.muted,cursor:'pointer'}}>
            {s.label}
          </button>
        ))}
      </div>
      {!done?(
        <>
          <div style={{background:T.edbg,border:`1px solid ${T.border}`,borderRadius:8,padding:'16px 18px',marginBottom:10,fontFamily:F.code,fontSize:13,lineHeight:1.9,userSelect:'none',whiteSpace:'pre-wrap',cursor:'text',minHeight:140}}>
            {snippet.split('').map((ch,i)=>{
              let color=T.muted,bg='transparent';
              if(i<typed.length){color=typed[i]===ch?T.success:T.error;bg=typed[i]!==ch?`${T.error}15`:'';}
              else if(i===typed.length)bg=`${T.accent}40`;
              return<span key={i} style={{color,background:bg,borderRadius:2}}>{ch==='\n'?'↵\n':ch===' '?'\u00a0':ch}</span>;
            })}
          </div>
          <div style={{height:3,background:T.border,borderRadius:2,marginBottom:10}}>
            <div style={{height:'100%',width:`${progress}%`,background:`linear-gradient(90deg,${T.accent},${T.accent2})`,borderRadius:2,transition:'width .1s'}}/>
          </div>
          <p style={{fontSize:12,color:T.muted}}>Click above and start typing · ↵ = Enter · ⇥ = 4 spaces · {typed.length}/{snippet.length} chars</p>
        </>
      ):(
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:10,padding:28,textAlign:'center'}}>
          <div style={{fontSize:44,marginBottom:8}}>🎉</div>
          <div style={{display:'flex',gap:20,justifyContent:'center',marginBottom:18}}>
            {[{label:"WPM",val:wpm,good:wpm>=60,target:"60+"},{label:"Accuracy",val:`${acc}%`,good:acc>=98,target:"98%+"}].map(({label,val,good,target})=>(
              <div key={label} style={{background:T.surface,borderRadius:8,padding:'12px 22px'}}>
                <div style={{fontSize:34,fontWeight:800,fontFamily:F.code,color:good?T.success:T.warn}}>{val}</div>
                <div style={{fontSize:12,color:T.muted}}>{label}</div>
                <div style={{fontSize:11,color:good?T.success:T.warn,marginTop:3}}>{good?'✓ Interview Ready':`Target: ${target}`}</div>
              </div>
            ))}
          </div>
          <p style={{fontSize:13,color:T.muted,marginBottom:16}}>{wpm<40?"Daily 20-min sessions → 60 WPM within 2 weeks.":wpm<60?"Focus on symbols: {}, [], (), :, _ — they're the slowest keys.":"Your typing won't bottleneck you. Focus 100% on problem-solving."}</p>
          <button onClick={reset} style={{padding:'7px 20px',fontSize:13,background:T.accent,color:'#fff',border:'none',borderRadius:6,cursor:'pointer',fontWeight:600}}>Practice Again</button>
        </div>
      )}
      <div style={{marginTop:22,padding:14,background:T.card,border:`1px solid ${T.border}`,borderRadius:8}}>
        <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>External Practice</div>
        {[["keybr.com — Adaptive finger training","https://keybr.com"],["monkeytype.com — Code mode","https://monkeytype.com/"],["typeracer.com — Race others","https://typeracer.com"]].map(([t,u])=>(
          <a key={t} href={u} target="_blank" rel="noopener noreferrer" style={{display:'block',fontSize:13,color:T.muted,textDecoration:'none',padding:'2px 0',transition:'color .1s'}} onMouseEnter={e=>e.target.style.color=T.accent} onMouseLeave={e=>e.target.style.color=T.muted}>↗ {t}</a>
        ))}
      </div>
    </div>
  );
}

// ── ANALYTICS ────────────────────────────────────────────────────
function Analytics({ xp, done, T }) {
  const rank=getRank(xp); const jr=getJobReadiness(xp,done);
  const total=Object.keys(done).length;
  const xpPct=rank.next===99999?100:Math.min(100,Math.round(xp/rank.next*100));
  return(
    <div style={{padding:24,maxWidth:900,margin:'0 auto'}}>
      <h2 style={{fontFamily:F.head,fontSize:17,color:T.accent,marginBottom:4}}>📊 Progress Analytics</h2>
      <p style={{fontSize:13,color:T.muted,marginBottom:20}}>Your path to Anthropic, tracked in real time.</p>
      <div style={{background:T.card,border:`2px solid ${jr.color}30`,borderRadius:12,padding:22,marginBottom:18}}>
        <div style={{display:'flex',gap:20,alignItems:'flex-start',flexWrap:'wrap'}}>
          <div>
            <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',color:T.muted,marginBottom:6}}>Job Readiness Score</div>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <div style={{fontSize:52,fontWeight:800,fontFamily:F.code,color:jr.color,lineHeight:1}}>{jr.score}%</div>
              <div><div style={{fontSize:16,fontWeight:700,color:jr.color}}>{jr.label}</div><div style={{fontSize:12,color:T.muted,marginTop:2}}>{total}/{TOTAL_LEVELS} levels · {xp} XP</div></div>
            </div>
          </div>
          <div style={{background:T.surface,borderRadius:10,padding:'12px 16px',flex:1,minWidth:220}}>
            <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em',color:T.muted,marginBottom:6}}>Professor's Assessment</div>
            <p style={{fontSize:13,color:T.text,lineHeight:1.7,margin:0}}>{jr.advice}</p>
          </div>
        </div>
        {jr.positions.length>0&&(<div style={{marginTop:16,paddingTop:14,borderTop:`1px solid ${T.border}`}}>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em',color:T.muted,marginBottom:8}}>🎯 Apply to These Roles Now</div>
          <div style={{display:'flex',gap:8,flexWrap:'wrap'}}>
            {jr.positions.map(p=><div key={p} style={{padding:'4px 11px',fontSize:12,background:`${jr.color}12`,color:jr.color,border:`1px solid ${jr.color}25`,borderRadius:20}}>{p}</div>)}
          </div>
        </div>)}
      </div>
      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:20,marginBottom:18}}>
        <div style={{fontSize:11,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:T.muted,marginBottom:14}}>Phase Progress</div>
        {PHASES.map((ph,i)=>{
          const comp=ph.levels.filter((_,li)=>done[`${ph.id}-${li}`]).length;
          const pct=Math.round(comp/ph.levels.length*100);
          return(<div key={i} style={{marginBottom:14}}>
            <div style={{display:'flex',justifyContent:'space-between',marginBottom:5}}>
              <span style={{fontSize:13,color:T.text}}>{ph.emoji} {ph.title}</span>
              <span style={{fontSize:12,color:T.muted}}>{comp}/{ph.levels.length} · <span style={{color:ph.color,fontWeight:600}}>{pct}%</span></span>
            </div>
            <div style={{height:7,background:T.border,borderRadius:4,overflow:'hidden'}}>
              <div style={{height:'100%',width:`${pct}%`,background:ph.color,borderRadius:4,transition:'width .5s'}}/>
            </div>
          </div>);
        })}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14}}>
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:18}}>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em',color:T.muted,marginBottom:10}}>Current Rank</div>
          <div style={{fontSize:20,fontWeight:800,fontFamily:F.code,color:T.accent,marginBottom:6}}>{rank.title}</div>
          <div style={{height:5,background:T.border,borderRadius:3,overflow:'hidden',marginBottom:5}}>
            <div style={{height:'100%',width:`${xpPct}%`,background:`linear-gradient(90deg,${T.accent},${T.accent2})`,borderRadius:3}}/>
          </div>
          <div style={{fontSize:12,color:T.muted}}>{xp} / {rank.next===99999?'MAX':rank.next} XP</div>
        </div>
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:18}}>
          <div style={{fontSize:11,textTransform:'uppercase',letterSpacing:'0.08em',color:T.muted,marginBottom:10}}>3 hrs/day Projection</div>
          <div style={{fontSize:20,fontWeight:800,fontFamily:F.code,color:T.accent,marginBottom:6}}>{total} <span style={{fontSize:13,fontWeight:400,color:T.muted}}>levels</span></div>
          <div style={{fontSize:13,color:T.text,marginBottom:3}}>Estimated timeline:</div>
          <div style={{fontSize:13,color:T.muted}}>{total<5?'~14 weeks → FAANG ready':total<12?'~9 weeks → FAANG ready':total<20?'~4 weeks → Anthropic ready':'Final stretch. Keep going!'}</div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────────
export default function AceInterviews() {
  const [dark,setDark]=useState(false); const T=dark?DARK:LIGHT;
  const [mode,setMode]=useState('learn'); // 'learn'|'typing'|'analytics'
  const [pi,setPi]=useState(0); const [li,setLi]=useState(0);
  const [tab,setTab]=useState('lesson');
  const [code,setCode]=useState('');
  const [output,setOutput]=useState(null); const [running,setRunning]=useState(false);
  const [lesson,setLesson]=useState(''); const [challenge,setChallenge]=useState('');
  const [loadingLesson,setLoadingLesson]=useState(false); const [loadingChallenge,setLoadingChallenge]=useState(false);
  const [profOpen,setProfOpen]=useState(false); const [profMsg,setProfMsg]=useState(''); const [askingProf,setAskingProf]=useState(false);
  const [xp,setXp]=useState(0); const [done,setDone]=useState({});
  const [sidebar,setSidebar]=useState(true); const [loaded,setLoaded]=useState(false);
  const [justRan,setJustRan]=useState(false);
  const [tts,setTts]=useState('idle'); // 'idle'|'loading'|'playing'
  const audioRef=useRef(null);
  const taRef=useRef(null);

  const phase=PHASES[pi]; const level=phase?.levels[li]; const lKey=`${pi}-${li}`;
  const isDone=done[lKey]; const rank=getRank(xp); const jr=getJobReadiness(xp,done);
  const xpPct=Math.min(100,rank.next===99999?100:Math.round(xp/rank.next*100));

  useEffect(()=>{
    try{const r=localStorage.getItem('aceV2');if(r){const d=JSON.parse(r);setXp(d.xp||0);setDone(d.done||{});setDark(d.dark||false);if(d.pi!=null)setPi(d.pi);if(d.li!=null)setLi(d.li);}}catch(e){}
    setLoaded(true);
  },[]);

  const stopAudio=useCallback(()=>{
    if(audioRef.current){audioRef.current.pause();audioRef.current.src='';audioRef.current=null;}
    setTts('idle');
  },[]);

  useEffect(()=>{
    if(!level)return;
    stopAudio();
    setCode(level.starter||''); setOutput(null); setLesson(''); setChallenge('');
    setProfOpen(false); setProfMsg(''); setJustRan(false);
  },[pi,li]);

  useEffect(()=>()=>stopAudio(),[stopAudio]);

  const save=(nx,nd,np,nl,ndk)=>{
    try{localStorage.setItem('aceV2',JSON.stringify({xp:nx,done:nd,pi:np,li:nl,dark:ndk??dark}));}catch(e){}
  };

  const loadLesson=async()=>{
    setLoadingLesson(true);
    const text=await generateLesson(phase,level);
    setLesson(text); setLoadingLesson(false);
  };
  const loadChallenge=async()=>{
    setLoadingChallenge(true);
    const text=await generateChallenge(phase,level);
    setChallenge(text); setLoadingChallenge(false);
  };

  const playLesson=async()=>{
    if(!lesson)return;
    if(tts==='playing'){stopAudio();return;}
    setTts('loading');
    try{
      const r=await fetch('/api/speak',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:lesson})});
      if(!r.ok){setTts('idle');return;}
      const blob=await r.blob();
      const url=URL.createObjectURL(blob);
      const audio=new Audio(url);
      audioRef.current=audio;
      audio.onended=()=>{URL.revokeObjectURL(url);setTts('idle');audioRef.current=null;};
      audio.onerror=()=>{URL.revokeObjectURL(url);setTts('idle');audioRef.current=null;};
      await audio.play();
      setTts('playing');
    }catch(e){setTts('idle');}
  };

  useEffect(()=>{
    if(mode==='learn'&&tab==='lesson'&&!lesson&&level) loadLesson();
  },[pi,li,tab,mode]);
  useEffect(()=>{
    if(mode==='learn'&&tab==='challenge'&&!challenge&&level) loadChallenge();
  },[pi,li,tab]);

  const runCode=async()=>{
    if(!code.trim()||running)return;
    setRunning(true); setOutput({type:'loading',text:'⟳  Executing Python 3.10...'});
    try{
      const r=await fetch('https://emkc.org/api/v2/piston/execute',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language:'python',version:'3.10.0',files:[{name:'s.py',content:code}],run_timeout:10000})});
      const d=await r.json();
      const out=(d.run?.stdout||'').trim(); const err=(d.run?.stderr||'').trim();
      if(err)setOutput({type:'error',text:err});
      else{setOutput({type:'success',text:out||'(no output — add some print() calls!)'});setJustRan(true);}
    }catch(e){setOutput({type:'error',text:'Network error. Please try again.'});}
    setRunning(false);
  };

  const askProf=async()=>{
    setAskingProf(true); setProfOpen(true); setProfMsg('');
    const prompt=`You are Professor Chen, Stanford CS professor. Give focused coaching in 3-4 short paragraphs.

Level: "${level?.title}" — Topic: ${level?.topic}
Student's code:
\`\`\`python\n${code}\n\`\`\`
Output: ${output?.text?.slice(0,200)||'Not run yet'}

1. What they're doing right (specific)
2. Most important issue as a Socratic question
3. One concrete next step (no full answer)
4. Encouraging close

Under 200 words. Be the mentor they needed.`;
    try{
      const r=await fetch('/api/claude',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-20250514',max_tokens:350,messages:[{role:'user',content:prompt}]})});
      const d=await r.json(); setProfMsg(d.content?.[0]?.text||'Try again shortly.');
    }catch(e){setProfMsg('Connection error.');}
    setAskingProf(false);
  };

  const completeLevel=async()=>{
    if(isDone)return;
    const nx=xp+level.xp; const nd={...done,[lKey]:true};
    setXp(nx); setDone(nd);
    let np=pi,nl=li;
    if(li<phase.levels.length-1)nl=li+1;
    else if(pi<PHASES.length-1){np=pi+1;nl=0;}
    save(nx,nd,np,nl);
    setTimeout(()=>{setPi(np);setLi(nl);},1500);
  };

  if(!loaded)return(
    <div style={{background:LIGHT.bg,height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.head}}>
      <div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>⚡</div><div style={{fontSize:14,color:LIGHT.accent,letterSpacing:'0.1em'}}>LOADING YOUR JOURNEY...</div></div>
    </div>
  );

  return(
    <div style={{background:T.bg,color:T.text,height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden',fontFamily:F.body}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;500&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px}.nav-hover:hover{background:${T.card}!important}.res-hover:hover{border-color:${T.accent}!important;transform:translateX(2px)}button{font-family:inherit;transition:all .12s}textarea{resize:none;outline:none;tab-size:4}`}</style>

      {/* TOP BAR */}
      <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,height:50,display:'flex',alignItems:'center',padding:'0 12px',gap:10,flexShrink:0,boxShadow:dark?'none':'0 1px 3px rgba(0,0,0,.06)'}}>
        <button onClick={()=>setSidebar(!sidebar)} style={{background:'none',border:'none',cursor:'pointer',color:T.muted,fontSize:17,padding:'4px 5px'}}>☰</button>
        <div style={{fontFamily:F.head,fontSize:13,color:T.accent,letterSpacing:'0.06em',fontWeight:700}}>ACE⚡INTERVIEWS</div>
        <div style={{height:18,width:1,background:T.border}}/>
        {[{id:'learn',l:'📚 Learn'},{id:'typing',l:'⌨️ Typing'},{id:'analytics',l:'📊 Analytics'}].map(m=>(
          <button key={m.id} onClick={()=>setMode(m.id)} style={{padding:'4px 11px',fontSize:12,border:`1px solid ${mode===m.id?T.accent:T.border}`,borderRadius:4,background:mode===m.id?`${T.accent}12`:'transparent',color:mode===m.id?T.accent:T.muted,cursor:'pointer'}}>
            {m.l}
          </button>
        ))}
        {mode==='learn'&&<><div style={{height:18,width:1,background:T.border}}/><div style={{fontSize:12,color:T.muted,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',flex:1}}><span style={{color:phase.color}}>{phase.emoji} {phase.title}</span><span style={{color:T.border}}> › </span><span>{level?.title}</span>{isDone&&<span style={{color:T.success,marginLeft:5}}>✓</span>}</div></>}
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:5,padding:'3px 9px',background:`${jr.color}12`,borderRadius:14,border:`1px solid ${jr.color}25`}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:jr.color}}/>
            <span style={{fontSize:11,color:jr.color,fontWeight:600}}>{jr.label}</span>
          </div>
          <div>
            <div style={{fontSize:10,color:T.muted,letterSpacing:'0.06em',textAlign:'right'}}>{rank.title}</div>
            <div style={{display:'flex',alignItems:'center',gap:5,marginTop:2}}>
              <div style={{width:65,height:3,background:T.border,borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:`${xpPct}%`,background:`linear-gradient(90deg,${T.accent},${T.accent2})`,borderRadius:2,transition:'width .5s'}}/></div>
              <span style={{fontSize:11,fontFamily:F.code,color:T.accent,fontWeight:700}}>{xp}XP</span>
            </div>
          </div>
          <span style={{fontSize:11,color:T.muted,borderLeft:`1px solid ${T.border}`,paddingLeft:8}}>{Object.keys(done).length}<span style={{opacity:.4}}>/{TOTAL_LEVELS}</span></span>
          <button onClick={()=>{const nd=!dark;setDark(nd);save(xp,done,pi,li,nd);}} style={{background:'none',border:`1px solid ${T.border}`,borderRadius:4,cursor:'pointer',color:T.muted,padding:'3px 7px',fontSize:13}}>{dark?'☀️':'🌙'}</button>
        </div>
      </div>

      {/* BODY */}
      <div style={{flex:1,display:'flex',overflow:'hidden'}}>
        {sidebar&&(
          <div style={{width:210,background:T.surface,borderRight:`1px solid ${T.border}`,overflowY:'auto',flexShrink:0,display:'flex',flexDirection:'column'}}>
            {PHASES.map((ph,phI)=>(
              <div key={phI}>
                <div style={{padding:'9px 12px 4px',fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',color:ph.color,fontWeight:700,borderTop:phI>0?`1px solid ${T.border}`:'none',display:'flex',alignItems:'center',gap:4}}><span>{ph.emoji}</span><span style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{ph.title}</span></div>
                {ph.levels.map((lev,lI)=>{
                  const k=`${phI}-${lI}`,doneIt=done[k],active=phI===pi&&lI===li&&mode==='learn';
                  return(<div key={lI} className="nav-hover" onClick={()=>{setPi(phI);setLi(lI);setTab('lesson');setMode('learn');}} style={{padding:'6px 12px 6px 20px',cursor:'pointer',background:active?T.card:'transparent',borderLeft:active?`2px solid ${ph.color}`:'2px solid transparent',display:'flex',alignItems:'center',gap:6,fontSize:11.5,color:active?T.text:T.muted}}>
                    <span style={{fontSize:10,color:doneIt?T.success:T.border,flexShrink:0}}>{doneIt?'✓':'○'}</span>
                    <span style={{lineHeight:1.35,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>{lev.title}</span>
                  </div>);
                })}
              </div>
            ))}
            <div style={{marginTop:'auto',padding:12,borderTop:`1px solid ${T.border}`}}>
              <div style={{fontSize:10,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:7}}>Essential Books</div>
              {[["Write Great Code","https://nostarch.com/writegreatcode1"],["Cracking the Coding Interview","https://www.crackingthecodinginterview.com/"],["DDIA","https://dataintensive.net/"]].map(([t,u])=>(
                <a key={t} href={u} target="_blank" rel="noopener noreferrer" style={{display:'block',fontSize:11,color:T.muted,textDecoration:'none',padding:'2px 0'}} onMouseEnter={e=>e.target.style.color=T.accent} onMouseLeave={e=>e.target.style.color=T.muted}>📖 {t}</a>
              ))}
            </div>
          </div>
        )}

        {mode==='typing'&&<div style={{flex:1,overflowY:'auto',background:T.bg}}><TypingTrainer T={T}/></div>}
        {mode==='analytics'&&<div style={{flex:1,overflowY:'auto',background:T.bg}}><Analytics xp={xp} done={done} T={T}/></div>}

        {mode==='learn'&&(
          <>
            {/* LEFT PANEL */}
            <div style={{width:sidebar?'calc(44% - 105px)':'44%',display:'flex',flexDirection:'column',borderRight:`1px solid ${T.border}`,overflow:'hidden',minWidth:280}}>
              <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'stretch',flexShrink:0}}>
                {[{id:'lesson',l:'📖 Lesson'},{id:'challenge',l:'💻 Challenge'},{id:'resources',l:'🔗 Resources'}].map(t=>(
                  <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'9px 12px',fontSize:12,fontWeight:tab===t.id?700:400,color:tab===t.id?T.accent:T.muted,background:tab===t.id?T.surface:'transparent',borderBottom:`2px solid ${tab===t.id?T.accent:'transparent'}`,border:'none',cursor:'pointer'}}>{t.l}</button>
                ))}
                <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:7,paddingRight:12}}>
                  <span style={{fontSize:10,padding:'2px 6px',borderRadius:3,background:`${T.accent}10`,color:T.accent}}>{level?.diff}</span>
                  <span style={{fontSize:10,color:T.muted}}>⏱{level?.time}</span>
                  <span style={{fontSize:11,fontFamily:F.code,color:T.accent,fontWeight:700}}>+{level?.xp}XP</span>
                </div>
              </div>
              <div style={{flex:1,overflowY:'auto',padding:20}}>
                {tab==='lesson'&&(
                  loadingLesson?(
                    <div style={{textAlign:'center',paddingTop:40,color:T.muted}}>
                      <div style={{fontSize:32,marginBottom:12}}>✨</div>
                      <div style={{fontSize:13}}>Professor Chen is preparing your lesson...</div>
                    </div>
                  ):(
                    <>
                      <div style={{fontSize:10,color:phase.color,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:700,marginBottom:10}}>{phase.emoji} {phase.title}</div>
                      <MD text={lesson} T={T}/>
                      {lesson&&<div style={{display:'flex',gap:8,marginTop:16}}>
                        <button onClick={loadLesson} style={{padding:'4px 12px',fontSize:11,color:T.muted,background:'transparent',border:`1px solid ${T.border}`,borderRadius:4,cursor:'pointer'}}>↻ Regenerate Lesson</button>
                        <button onClick={playLesson} disabled={tts==='loading'} style={{padding:'4px 12px',fontSize:11,color:tts==='playing'?T.error:T.accent,background:tts==='playing'?`${T.error}10`:`${T.accent}10`,border:`1px solid ${tts==='playing'?`${T.error}25`:`${T.accent}25`}`,borderRadius:4,cursor:tts==='loading'?'wait':'pointer',opacity:tts==='loading'?.6:1}}>
                          {tts==='loading'?'⟳ Loading...':tts==='playing'?'⏹ Stop':'🔊 Listen'}
                        </button>
                      </div>}
                    </>
                  )
                )}
                {tab==='challenge'&&(
                  loadingChallenge?(
                    <div style={{textAlign:'center',paddingTop:40,color:T.muted}}>
                      <div style={{fontSize:32,marginBottom:12}}>🎯</div>
                      <div style={{fontSize:13}}>Professor Chen is crafting your challenge...</div>
                    </div>
                  ):(
                    <>
                      <MD text={challenge} T={T}/>
                      {challenge&&<button onClick={loadChallenge} style={{marginTop:16,padding:'4px 12px',fontSize:11,color:T.muted,background:'transparent',border:`1px solid ${T.border}`,borderRadius:4,cursor:'pointer'}}>↻ New Challenge</button>}
                    </>
                  )
                )}
                {tab==='resources'&&(
                  <div>
                    <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',color:T.muted,fontWeight:700,marginBottom:14}}>📚 Curated Resources</div>
                    {[{title:"NeetCode Roadmap — Complete",url:"https://neetcode.io/roadmap",tag:"Essential"},{title:"LeetCode Top 150",url:"https://leetcode.com/studyplan/top-interview-150/",tag:"Practice"},{title:"System Design Primer ★200k",url:"https://github.com/donnemartin/system-design-primer",tag:"GitHub"},{title:"Write Great Code Vol. 1",url:"https://nostarch.com/writegreatcode1",tag:"Book"},{title:"Cracking the Coding Interview",url:"https://www.crackingthecodinginterview.com/",tag:"Book"},{title:"Designing Data-Intensive Apps",url:"https://dataintensive.net/",tag:"Book"},{title:"CS50 Free (Harvard)",url:"https://cs50.harvard.edu/x/",tag:"Free Course"},{title:"Python Official Docs",url:"https://docs.python.org/3/tutorial/",tag:"Docs"},{title:"Big-O Cheat Sheet",url:"https://www.bigocheatsheet.com/",tag:"Reference"},{title:"Visualgo (Algorithm Animations)",url:"https://visualgo.net/",tag:"Visual"},{title:"Grokking System Design",url:"https://www.designgurus.io/course/grokking-the-system-design-interview",tag:"Course"},{title:"MIT OCW 6.006 Algorithms (Free)",url:"https://ocw.mit.edu/courses/6-006-introduction-to-algorithms-fall-2011/",tag:"Lecture"},{title:"Anthropic Careers",url:"https://www.anthropic.com/careers",tag:"Apply"},{title:"Blind — Anthropic Interview Reports",url:"https://www.teamblind.com/company/Anthropic",tag:"Community"}].map((r,i)=>(
                      <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" className="res-hover" style={{display:'flex',alignItems:'center',gap:9,padding:'9px 12px',background:T.card,border:`1px solid ${T.border}`,borderRadius:7,marginBottom:8,textDecoration:'none',transition:'all .12s'}}>
                        <span style={{fontSize:10,padding:'2px 6px',borderRadius:3,background:`${T.accent}10`,color:T.accent,whiteSpace:'nowrap',flexShrink:0}}>{r.tag}</span>
                        <span style={{fontSize:13,color:T.text}}>{r.title}</span>
                        <span style={{marginLeft:'auto',color:T.muted,fontSize:11}}>↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT PANEL — EDITOR */}
            <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:260}}>
              <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,padding:'6px 11px',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                <span style={{fontSize:11,color:T.muted,fontFamily:F.code,flex:1}}>🐍 solution.py — Python 3.10</span>
                <button onClick={askProf} style={{padding:'4px 10px',fontSize:11,color:T.accent2,background:`${T.accent2}10`,border:`1px solid ${T.accent2}25`,borderRadius:4,cursor:'pointer'}}>🎓 Ask Professor</button>
                <button onClick={runCode} disabled={running} style={{padding:'4px 14px',fontSize:12,fontWeight:700,background:running?T.muted:T.accent,color:dark?'#000':'#fff',border:'none',borderRadius:5,cursor:'pointer',opacity:running?.7:1}}>
                  {running?'⟳ Running...':'▶ Run'}
                </button>
              </div>
              <div style={{flex:1,overflow:'hidden',minHeight:0}}>
                <textarea ref={taRef} value={code} onChange={e=>setCode(e.target.value)}
                  onKeyDown={e=>{if(e.key==='Tab'){e.preventDefault();const s=e.target.selectionStart,en=e.target.selectionEnd;const n=code.slice(0,s)+'    '+code.slice(en);setCode(n);setTimeout(()=>{e.target.selectionStart=e.target.selectionEnd=s+4;},0);}}}
                  spellCheck={false} style={{width:'100%',height:'100%',background:T.edbg,color:T.edtx,fontFamily:F.code,fontSize:13,lineHeight:1.7,padding:'14px 16px',border:'none',outline:'none'}}/>
              </div>
              <div style={{height:165,background:T.outbg,borderTop:`1px solid ${T.border}`,display:'flex',flexDirection:'column',flexShrink:0}}>
                <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,padding:'5px 11px',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                  <span style={{fontSize:10,color:T.muted,fontFamily:F.code,textTransform:'uppercase',letterSpacing:'0.1em'}}>Output</span>
                  {output&&<span style={{fontSize:10,padding:'1px 5px',borderRadius:3,background:output.type==='success'?`${T.success}15`:output.type==='error'?`${T.error}15`:`${T.muted}20`,color:output.type==='success'?T.success:output.type==='error'?T.error:T.muted}}>{output.type==='loading'?'running':output.type}</span>}
                  {justRan&&!isDone&&output?.type==='success'&&(
                    <button onClick={completeLevel} style={{marginLeft:'auto',padding:'3px 12px',fontSize:11,fontWeight:700,background:T.accent,color:dark?'#000':'#fff',border:'none',borderRadius:4,cursor:'pointer'}}>✓ Complete Level (+{level?.xp} XP)</button>
                  )}
                  {isDone&&<span style={{marginLeft:'auto',fontSize:11,color:T.success}}>✓ Completed</span>}
                </div>
                <div style={{flex:1,overflowY:'auto',padding:'8px 13px',fontFamily:F.code,fontSize:12,lineHeight:1.7,color:output?.type==='error'?T.error:T.success,whiteSpace:'pre-wrap'}}>
                  {output?output.text:<span style={{color:T.muted,fontStyle:'italic'}}>Run your code to see output here...</span>}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* PROFESSOR PANEL */}
      {profOpen&&mode==='learn'&&(
        <div style={{position:'absolute',bottom:0,right:0,width:360,maxHeight:'52vh',background:T.surface,border:`1px solid ${T.border}`,borderTop:`1px solid ${T.accent2}35`,borderLeft:`1px solid ${T.accent2}35`,borderRadius:'10px 0 0 0',display:'flex',flexDirection:'column',zIndex:200,boxShadow:'-4px -4px 24px rgba(0,0,0,.13)'}}>
          <div style={{padding:'10px 13px',borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'center',gap:9}}>
            <div style={{width:32,height:32,borderRadius:'50%',background:`linear-gradient(135deg,${T.accent},${T.accent2})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:16,flexShrink:0}}>🎓</div>
            <div><div style={{fontSize:13,fontWeight:700,color:T.text}}>Professor Chen</div><div style={{fontSize:10,color:T.muted}}>Stanford CS · Office Hours</div></div>
            <button onClick={()=>setProfOpen(false)} style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',color:T.muted,fontSize:20,lineHeight:1}}>×</button>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:14,fontSize:13,lineHeight:1.8,color:T.text}}>
            {askingProf?(<div style={{color:T.muted,textAlign:'center',paddingTop:20,fontSize:12}}><div style={{fontSize:26,marginBottom:8}}>💭</div>Reviewing your code...</div>)
            :profMsg?(<div style={{whiteSpace:'pre-wrap'}}>{profMsg}</div>)
            :(<div style={{color:T.muted,fontSize:12,textAlign:'center',paddingTop:18}}>Loading feedback...</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
