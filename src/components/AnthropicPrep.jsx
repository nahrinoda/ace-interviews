"use client";
import { useState, useEffect, useRef, useCallback } from "react";

// ── THEMES ───────────────────────────────────────────────────────
const DARK = {
  bg:"#04060f",surface:"#080c1a",card:"#0c1020",border:"#151d35",
  accent:"#00c8ff",accent2:"#7b6cf6",accent3:"#00ff9f",
  text:"#d8e4f8",muted:"#3d4d78",success:"#00e676",error:"#ff4455",
  warn:"#ffb300",edbg:"#060914",edtx:"#b8ccf0",outbg:"#030508",tier:"#0a0e1e"
};
const LIGHT = {
  bg:"#eef2ff",surface:"#ffffff",card:"#e4eaff",border:"#c8d4f0",
  accent:"#005fcc",accent2:"#5b33d6",accent3:"#007a4a",
  text:"#0a1228",muted:"#4a5a90",success:"#006633",error:"#cc1100",
  warn:"#996600",edbg:"#121830",edtx:"#b8ccf0",outbg:"#0a1020",tier:"#dce4ff"
};
const F = {
  code:'"JetBrains Mono",monospace',
  head:'"Syne",sans-serif',
  body:'"Outfit",sans-serif'
};

// ── CURRICULUM ───────────────────────────────────────────────────
const PHASES = [
{id:0,emoji:"⚙️",title:"Machine Foundations",color:"#10b981",
 desc:"Write Great Code Vol 1 & 2 — the layer most engineers skip",
 levels:[
  {title:"Numeric Representation & Binary",xp:150,time:"45 min",diff:"Foundation",
   topic:"binary/hex representation, bit operations, why integers overflow, IEEE 754 floats, how Python stores ints internally, cost of conversions — all from Write Great Code Vol 1",
   starter:`# Write Great Code Vol.1 — Chapter 2: Numeric Representation
# Understanding this is WHY you can write efficient code.

def count_set_bits(n: int) -> int:
    """Kernighan's algorithm — clears lowest set bit each iteration."""
    count = 0
    while n:
        n &= n - 1   # Clear lowest set bit
        count += 1
    return count

def is_power_of_two(n: int) -> bool:
    """If n is power of 2, exactly one bit is set. n & (n-1) clears it."""
    return n > 0 and (n & (n - 1)) == 0

def pack_rgb(r: int, g: int, b: int) -> int:
    """Pack 3 bytes into single 24-bit integer."""
    return (r << 16) | (g << 8) | b

def unpack_rgb(packed: int) -> tuple:
    """Extract r, g, b from packed integer."""
    return (packed >> 16) & 0xFF, (packed >> 8) & 0xFF, packed & 0xFF

print(count_set_bits(255))    # 8 — all bits set
print(is_power_of_two(1024))  # True
print(is_power_of_two(1023))  # False
packed = pack_rgb(255, 128, 0)
print(unpack_rgb(packed))     # (255, 128, 0)`},
  {title:"Memory Layout & Cache Performance",xp:180,time:"50 min",diff:"Foundation",
   topic:"how memory is organized, cache lines (64 bytes), spatial vs temporal locality, why struct layout matters, array-of-structs vs struct-of-arrays, Python object overhead — Write Great Code Vol 1 Ch 6-7",
   starter:`import sys
import time

# Write Great Code Vol.1 — Memory Organization
# Cache line = 64 bytes. Access patterns determine performance.

def measure_access_pattern():
    """Row-major vs column-major access — cache locality demo."""
    SIZE = 500
    matrix = [[i * SIZE + j for j in range(SIZE)] for i in range(SIZE)]

    # Cache-friendly: row-major (Python lists stored row by row)
    start = time.perf_counter()
    total = sum(matrix[i][j] for i in range(SIZE) for j in range(SIZE))
    row_time = time.perf_counter() - start

    # Cache-unfriendly: column-major
    start = time.perf_counter()
    total2 = sum(matrix[i][j] for j in range(SIZE) for i in range(SIZE))
    col_time = time.perf_counter() - start

    print(f"Row-major (cache friendly):   {row_time:.4f}s")
    print(f"Col-major (cache unfriendly): {col_time:.4f}s")
    print(f"Ratio: {col_time/row_time:.2f}x slower")

def python_object_overhead():
    """Python int is NOT 4 bytes — it's a full object."""
    print(f"sys.getsizeof(0):    {sys.getsizeof(0)} bytes")
    print(f"sys.getsizeof(2**30):{sys.getsizeof(2**30)} bytes")
    print(f"Empty list []:       {sys.getsizeof([])} bytes")
    print(f"List [1,2,3]:        {sys.getsizeof([1,2,3])} bytes")
    print(f"Dict {{}}:             {sys.getsizeof({})} bytes")

measure_access_pattern()
python_object_overhead()`},
  {title:"Thinking Low-Level, Writing High-Level",xp:200,time:"55 min",diff:"Foundation",
   topic:"Write Great Code Vol 2 core thesis — write Python that compiles well in your head, cost of abstractions, what a list comprehension costs vs a loop, generator expressions, when NOT to be clever, why Anthropic values this thinking",
   starter:`import timeit
from typing import Generator

# Write Great Code Vol.2 — Thinking Low-Level, Writing High-Level
# Every abstraction has a cost. Know the cost before you pay it.

def cost_of_string_concat(n: int = 10000):
    """O(n²) vs O(n) string building — same output, wildly different cost."""
    # BAD: each += creates a new string object (O(n²) total copies)
    def naive():
        s = ""
        for i in range(n):
            s += str(i)
        return s

    # GOOD: join is O(n) — builds once
    def efficient():
        return "".join(str(i) for i in range(n))

    t1 = timeit.timeit(naive, number=100)
    t2 = timeit.timeit(efficient, number=100)
    print(f"String concat: {t1:.3f}s | join: {t2:.3f}s | {t1/t2:.1f}x faster")

def generator_vs_list(n: int = 100000):
    """Generators: O(1) memory vs O(n). Critical for large Anthropic systems."""
    # List: allocates ALL n items upfront
    def use_list() -> int:
        return sum([x * x for x in range(n)])

    # Generator: one item at a time, O(1) memory
    def use_gen() -> int:
        return sum(x * x for x in range(n))

    t1 = timeit.timeit(use_list, number=50)
    t2 = timeit.timeit(use_gen, number=50)
    print(f"List: {t1:.3f}s | Generator: {t2:.3f}s")
    print("Generator uses O(1) memory — critical at Anthropic scale")

cost_of_string_concat()
generator_vs_list()`},
]},
{id:1,emoji:"🐍",title:"Python for Anthropic",color:"#00e676",
 desc:"The exact Python style Anthropic engineers expect",
 levels:[
  {title:"Clean OOP & Type Hints",xp:200,time:"50 min",diff:"Core Skill",
   topic:"Python classes, __init__, @property, @classmethod, type hints from typing, dataclasses, designing clean APIs — Anthropic expects production-quality Python with full type annotations",
   starter:`from typing import Optional, List, Dict
from dataclasses import dataclass, field
from enum import Enum

class TransactionType(Enum):
    DEPOSIT = "deposit"
    WITHDRAWAL = "withdrawal"

@dataclass
class Transaction:
    type: TransactionType
    amount: float
    balance_after: float
    note: str = ""

class Account:
    """
    Clean, type-annotated Python class — Anthropic interview standard.
    Note: full docstrings, type hints, @property for encapsulation.
    """
    def __init__(self, account_id: str, owner: str, initial_balance: float = 0.0) -> None:
        self._id = account_id
        self._owner = owner
        self._balance = initial_balance
        self._history: List[Transaction] = []

    @property
    def balance(self) -> float:
        return self._balance

    @property
    def owner(self) -> str:
        return self._owner

    def deposit(self, amount: float, note: str = "") -> float:
        if amount <= 0:
            raise ValueError(f"Deposit amount must be positive, got {amount}")
        self._balance += amount
        self._history.append(Transaction(TransactionType.DEPOSIT, amount, self._balance, note))
        return self._balance

    def withdraw(self, amount: float, note: str = "") -> float:
        if amount <= 0:
            raise ValueError(f"Withdrawal must be positive, got {amount}")
        if amount > self._balance:
            raise ValueError(f"Insufficient funds: balance={self._balance}, requested={amount}")
        self._balance -= amount
        self._history.append(Transaction(TransactionType.WITHDRAWAL, amount, self._balance, note))
        return self._balance

    def get_history(self) -> List[Transaction]:
        return list(self._history)  # Return copy — don't expose internal state

# Test it
acc = Account("ACC001", "Nahrin", 1000.0)
acc.deposit(500, "salary")
acc.withdraw(200, "rent")
print(f"Balance: \${acc.balance}")
for t in acc.get_history():
    print(f"  {t.type.value}: \${t.amount} — balance \${t.balance_after}")`},
  {title:"Python Standard Library Mastery",xp:200,time:"55 min",diff:"Core Skill",
   topic:"collections (defaultdict, Counter, deque, OrderedDict), itertools, functools (lru_cache, partial), heapq, bisect — what Anthropic expects you to use without thinking",
   starter:`from collections import defaultdict, Counter, deque, OrderedDict
from functools import lru_cache
import heapq
import bisect
from typing import List, Dict, Optional

# —— Pattern 1: defaultdict for grouping (used in almost every OA) ——
def group_by_prefix(words: List[str], prefix_len: int) -> Dict[str, List[str]]:
    groups: Dict[str, List[str]] = defaultdict(list)
    for word in words:
        groups[word[:prefix_len]].append(word)
    return dict(groups)

# —— Pattern 2: Counter for frequency analysis ——
def top_k_transactions(transactions: List[str], k: int) -> List[tuple]:
    return Counter(transactions).most_common(k)

# —— Pattern 3: deque for O(1) sliding window ——
def sliding_window_max(nums: List[int], k: int) -> List[int]:
    """O(n) using monotonic deque — key pattern for Anthropic problems."""
    dq: deque = deque()  # stores indices
    result = []
    for i, n in enumerate(nums):
        while dq and nums[dq[-1]] <= n: dq.pop()
        dq.append(i)
        if dq[0] == i - k: dq.popleft()
        if i >= k - 1: result.append(nums[dq[0]])
    return result

# —— Pattern 4: heapq for priority/scheduling problems ——
def k_closest_events(events: List[tuple], k: int) -> List[tuple]:
    """events = [(timestamp, event_name)] — return k most recent."""
    return heapq.nlargest(k, events, key=lambda x: x[0])

# —— Pattern 5: lru_cache for memoization in OA problems ——
@lru_cache(maxsize=None)
def count_ways(n: int, step_sizes: tuple) -> int:
    if n == 0: return 1
    if n < 0: return 0
    return sum(count_ways(n - s, step_sizes) for s in step_sizes)

print(group_by_prefix(["apple","application","apply","banana","band"], 3))
print(top_k_transactions(["A","B","A","C","B","A"], 2))
print(sliding_window_max([1,3,-1,-3,5,3,6,7], 3))
print(count_ways(5, (1,2,3)))`},
  {title:"Writing Testable, Modular Code",xp:220,time:"60 min",diff:"Core Skill",
   topic:"Anthropic's #1 signal: clean modular code that absorbs new requirements, edge case handling, separation of concerns, writing code that can be extended in 4 tiers without rewrite — exactly what the OA tests",
   starter:`from typing import Optional, List, Dict, Any
from abc import ABC, abstractmethod

# Anthropic's OA tests ONE thing above all: can your code absorb new requirements?
# This level teaches you to structure code so Tier 2, 3, 4 don't require a rewrite.

# —— PRINCIPLE: Separate storage from logic from interface ——

class Storage(ABC):
    """Interface — swap implementations without changing logic."""
    @abstractmethod
    def get(self, key: str) -> Optional[Any]: ...
    @abstractmethod
    def set(self, key: str, value: Any) -> None: ...
    @abstractmethod
    def delete(self, key: str) -> bool: ...
    @abstractmethod
    def keys(self) -> List[str]: ...

class InMemoryStorage(Storage):
    def __init__(self):
        self._data: Dict[str, Any] = {}

    def get(self, key: str) -> Optional[Any]:
        return self._data.get(key)

    def set(self, key: str, value: Any) -> None:
        self._data[key] = value

    def delete(self, key: str) -> bool:
        if key in self._data:
            del self._data[key]
            return True
        return False

    def keys(self) -> List[str]:
        return list(self._data.keys())

class RecordNotFoundError(Exception):
    pass

class InvalidOperationError(Exception):
    pass

class DataStore:
    """Business logic layer — completely independent of storage."""
    def __init__(self, storage: Storage) -> None:
        self._storage = storage
        self._ops_log: List[str] = []

    def create(self, key: str, value: Any) -> None:
        if self._storage.get(key) is not None:
            raise InvalidOperationError(f"Key '{key}' already exists")
        self._storage.set(key, value)
        self._ops_log.append(f"CREATE {key}")

    def read(self, key: str) -> Any:
        val = self._storage.get(key)
        if val is None:
            raise RecordNotFoundError(f"Key '{key}' not found")
        return val

    def update(self, key: str, value: Any) -> None:
        if self._storage.get(key) is None:
            raise RecordNotFoundError(f"Key '{key}' not found")
        self._storage.set(key, value)
        self._ops_log.append(f"UPDATE {key}")

    def delete(self, key: str) -> None:
        if not self._storage.delete(key):
            raise RecordNotFoundError(f"Key '{key}' not found")
        self._ops_log.append(f"DELETE {key}")

    def audit_log(self) -> List[str]:
        return list(self._ops_log)

# This structure lets you add TTL, transactions, persistence without touching DataStore
store = DataStore(InMemoryStorage())
store.create("user:1", {"name": "Nahrin", "balance": 1000})
store.update("user:1", {"name": "Nahrin", "balance": 1500})
print(store.read("user:1"))
print(store.audit_log())`},
]},
{id:2,emoji:"🏗️",title:"OA Practice: System Building",color:"#7b6cf6",
 desc:"Anthropic's actual CodeSignal format — 4 progressive tiers per problem",
 levels:[
  {title:"Banking System",xp:500,time:"90 min",diff:"OA Format",isTiered:true,
   topic:"multi-tier progressive system building — Anthropic's most common OA problem type, clean OOP, handling edge cases at each tier, designing for extensibility",
   tiers:[
    {title:"Tier 1: Core Account Operations",
     desc:"Build a bank that supports: CREATE_ACCOUNT, DEPOSIT, WITHDRAW, GET_BALANCE. All operations must be atomic and handle errors gracefully.",
     reqs:["CREATE_ACCOUNT <id> — fails if id exists","DEPOSIT <id> <amount> — amount > 0","WITHDRAW <id> <amount> — fails if insufficient","GET_BALANCE <id> — returns current balance"],
     starter:`from typing import Dict, Optional

class Bank:
    def __init__(self) -> None:
        self._accounts: Dict[str, float] = {}

    def create_account(self, account_id: str) -> bool:
        if account_id in self._accounts:
            return False
        self._accounts[account_id] = 0.0
        return True

    def deposit(self, account_id: str, amount: float) -> Optional[float]:
        if account_id not in self._accounts or amount <= 0:
            return None
        self._accounts[account_id] += amount
        return self._accounts[account_id]

    def withdraw(self, account_id: str, amount: float) -> Optional[float]:
        if account_id not in self._accounts or amount <= 0:
            return None
        if self._accounts[account_id] < amount:
            return None  # Insufficient funds
        self._accounts[account_id] -= amount
        return self._accounts[account_id]

    def get_balance(self, account_id: str) -> Optional[float]:
        return self._accounts.get(account_id)

# Test Tier 1
bank = Bank()
print(bank.create_account("acc1"))   # True
print(bank.create_account("acc1"))   # False — already exists
print(bank.deposit("acc1", 1000))    # 1000.0
print(bank.withdraw("acc1", 300))    # 700.0
print(bank.withdraw("acc1", 800))    # None — insufficient
print(bank.get_balance("acc1"))      # 700.0`},
    {title:"Tier 2: Transaction History",
     desc:"Extend Tier 1. Add GET_TRANSACTIONS <id> [limit] that returns the last N transactions in reverse chronological order, each with type, amount, timestamp.",
     reqs:["All Tier 1 operations still work","Transactions stored per account","GET_TRANSACTIONS <id> <limit> returns list","Each transaction has: type, amount, balance_after, timestamp"],
     starter:`from typing import Dict, List, Optional
from dataclasses import dataclass, field
import time

@dataclass
class Transaction:
    type: str          # "deposit" or "withdrawal"
    amount: float
    balance_after: float
    timestamp: float = field(default_factory=time.time)

class Bank:
    def __init__(self) -> None:
        self._accounts: Dict[str, float] = {}
        self._transactions: Dict[str, List[Transaction]] = {}

    def create_account(self, account_id: str) -> bool:
        if account_id in self._accounts:
            return False
        self._accounts[account_id] = 0.0
        self._transactions[account_id] = []
        return True

    def deposit(self, account_id: str, amount: float) -> Optional[float]:
        if account_id not in self._accounts or amount <= 0:
            return None
        self._accounts[account_id] += amount
        bal = self._accounts[account_id]
        self._transactions[account_id].append(Transaction("deposit", amount, bal))
        return bal

    def withdraw(self, account_id: str, amount: float) -> Optional[float]:
        if account_id not in self._accounts or amount <= 0:
            return None
        if self._accounts[account_id] < amount:
            return None
        self._accounts[account_id] -= amount
        bal = self._accounts[account_id]
        self._transactions[account_id].append(Transaction("withdrawal", amount, bal))
        return bal

    def get_balance(self, account_id: str) -> Optional[float]:
        return self._accounts.get(account_id)

    def get_transactions(self, account_id: str, limit: int = 10) -> Optional[List[Transaction]]:
        if account_id not in self._transactions:
            return None
        return list(reversed(self._transactions[account_id]))[:limit]

bank = Bank()
bank.create_account("acc1")
bank.deposit("acc1", 1000)
bank.withdraw("acc1", 200)
bank.deposit("acc1", 500)
for t in bank.get_transactions("acc1", 2):
    print(f"{t.type}: \${t.amount} — balance \${t.balance_after}")`},
    {title:"Tier 3: Transfer & Scheduled Payments",
     desc:"Add TRANSFER <from_id> <to_id> <amount> and SCHEDULE_PAYMENT <from_id> <to_id> <amount> <delay_ms>. Transfer must be atomic — either both accounts update or neither does.",
     reqs:["TRANSFER is atomic — partial transfers must not happen","SCHEDULE_PAYMENT executes after delay_ms milliseconds","Scheduled payments inherit all withdrawal rules","Failed scheduled payments are logged but don't crash"],
     starter:`from typing import Dict, List, Optional
from dataclasses import dataclass, field
import time
import threading

@dataclass
class Transaction:
    type: str
    amount: float
    balance_after: float
    note: str = ""
    timestamp: float = field(default_factory=time.time)

class Bank:
    def __init__(self) -> None:
        self._accounts: Dict[str, float] = {}
        self._transactions: Dict[str, List[Transaction]] = {}
        self._lock = threading.Lock()  # Needed for scheduled payments

    def create_account(self, account_id: str) -> bool:
        if account_id in self._accounts:
            return False
        self._accounts[account_id] = 0.0
        self._transactions[account_id] = []
        return True

    def _record(self, account_id: str, txn_type: str, amount: float, note: str = "") -> None:
        self._transactions[account_id].append(
            Transaction(txn_type, amount, self._accounts[account_id], note)
        )

    def deposit(self, account_id: str, amount: float) -> Optional[float]:
        if account_id not in self._accounts or amount <= 0: return None
        with self._lock:
            self._accounts[account_id] += amount
            self._record(account_id, "deposit", amount)
        return self._accounts[account_id]

    def withdraw(self, account_id: str, amount: float, note: str = "") -> Optional[float]:
        if account_id not in self._accounts or amount <= 0: return None
        with self._lock:
            if self._accounts[account_id] < amount: return None
            self._accounts[account_id] -= amount
            self._record(account_id, "withdrawal", amount, note)
        return self._accounts[account_id]

    def transfer(self, from_id: str, to_id: str, amount: float) -> bool:
        """Atomic transfer — lock both accounts."""
        if from_id not in self._accounts or to_id not in self._accounts: return False
        if amount <= 0: return False
        with self._lock:
            if self._accounts[from_id] < amount: return False
            self._accounts[from_id] -= amount
            self._accounts[to_id] += amount
            self._record(from_id, "transfer_out", amount, f"-> {to_id}")
            self._record(to_id, "transfer_in", amount, f"<- {from_id}")
        return True

    def schedule_payment(self, from_id: str, to_id: str, amount: float, delay_ms: float) -> None:
        def execute():
            result = self.transfer(from_id, to_id, amount)
            print(f"Scheduled payment \${amount}: {'OK' if result else 'FAILED'}")
        timer = threading.Timer(delay_ms / 1000.0, execute)
        timer.daemon = True
        timer.start()

    def get_balance(self, account_id: str) -> Optional[float]:
        return self._accounts.get(account_id)

bank = Bank()
bank.create_account("alice"); bank.create_account("bob")
bank.deposit("alice", 1000); bank.deposit("bob", 500)
print(bank.transfer("alice", "bob", 300))  # True
print(bank.get_balance("alice"))            # 700.0
print(bank.get_balance("bob"))             # 800.0
bank.schedule_payment("bob", "alice", 100, 500)
print("Scheduled payment queued...")
import time; time.sleep(0.7)  # Wait for scheduled payment`},
    {title:"Tier 4: Fraud Detection & Limits",
     desc:"Add fraud detection: flag accounts that make >3 withdrawals within 60s, or withdraw >50% of balance in single transaction. Flagged accounts are frozen until manually unfrozen.",
     reqs:["Flag account if >3 withdrawals in 60 seconds","Flag account if single withdrawal >50% of balance","FREEZE <id> / UNFREEZE <id> admin operations","Frozen accounts reject all transactions","GET_FLAGGED_ACCOUNTS returns all currently flagged accounts"],
     starter:`from typing import Dict, List, Optional, Set
from dataclasses import dataclass, field
from collections import deque
import time, threading

@dataclass
class Transaction:
    type: str; amount: float; balance_after: float
    note: str = ""; timestamp: float = field(default_factory=time.time)

class FraudDetector:
    def __init__(self, max_withdrawals: int = 3, window_seconds: float = 60.0,
                 large_pct: float = 0.5) -> None:
        self._windows: Dict[str, deque] = {}
        self._max_withdrawals = max_withdrawals
        self._window_s = window_seconds
        self._large_pct = large_pct

    def check_withdrawal(self, account_id: str, amount: float, balance: float) -> Optional[str]:
        now = time.time()
        if account_id not in self._windows:
            self._windows[account_id] = deque()
        win = self._windows[account_id]
        while win and now - win[0] > self._window_s:
            win.popleft()
        win.append(now)
        if len(win) > self._max_withdrawals:
            return f"Velocity fraud: {len(win)} withdrawals in {self._window_s}s"
        if balance > 0 and amount / balance > self._large_pct:
            return f"Large withdrawal: {amount/balance:.0%} of balance"
        return None  # No fraud detected

class Bank:
    def __init__(self) -> None:
        self._accounts: Dict[str, float] = {}
        self._transactions: Dict[str, List[Transaction]] = {}
        self._frozen: Set[str] = set()
        self._fraud_reasons: Dict[str, str] = {}
        self._fraud = FraudDetector()
        self._lock = threading.Lock()

    def create_account(self, account_id: str) -> bool:
        if account_id in self._accounts: return False
        self._accounts[account_id] = 0.0
        self._transactions[account_id] = []
        return True

    def deposit(self, account_id: str, amount: float) -> Optional[float]:
        if account_id not in self._accounts or amount <= 0: return None
        if account_id in self._frozen: return None
        with self._lock:
            self._accounts[account_id] += amount
        return self._accounts[account_id]

    def withdraw(self, account_id: str, amount: float) -> Optional[float]:
        if account_id not in self._accounts or amount <= 0: return None
        if account_id in self._frozen: return None
        with self._lock:
            if self._accounts[account_id] < amount: return None
            fraud_reason = self._fraud.check_withdrawal(
                account_id, amount, self._accounts[account_id])
            if fraud_reason:
                self._frozen.add(account_id)
                self._fraud_reasons[account_id] = fraud_reason
                return None
            self._accounts[account_id] -= amount
        return self._accounts[account_id]

    def freeze(self, account_id: str) -> bool:
        if account_id not in self._accounts: return False
        self._frozen.add(account_id); return True

    def unfreeze(self, account_id: str) -> bool:
        if account_id not in self._frozen: return False
        self._frozen.discard(account_id)
        self._fraud_reasons.pop(account_id, None); return True

    def get_flagged_accounts(self) -> List[Dict]:
        return [{"id": aid, "reason": self._fraud_reasons.get(aid, "manual")}
                for aid in self._frozen]

    def get_balance(self, account_id: str) -> Optional[float]:
        return self._accounts.get(account_id)

bank = Bank()
bank.create_account("acc1"); bank.deposit("acc1", 1000)
for i in range(4):
    result = bank.withdraw("acc1", 50)
    print(f"Withdrawal {i+1}: {result}")
print("Flagged:", bank.get_flagged_accounts())`},
   ]},
  {title:"In-Memory Key-Value Store",xp:500,time:"90 min",diff:"OA Format",isTiered:true,
   topic:"another top Anthropic OA problem — build a Redis-like KV store with progressive complexity, TTL, transactions, persistence simulation",
   tiers:[
    {title:"Tier 1: SET / GET / DELETE",
     desc:"Build a key-value store with SET, GET, DELETE. GET on missing key returns None. DELETE returns True if key existed.",
     reqs:["SET <key> <value> — upsert","GET <key> — value or None","DELETE <key> — True/False","All string keys, values can be any type"],
     starter:`from typing import Any, Dict, Optional

class KeyValueStore:
    def __init__(self) -> None:
        self._store: Dict[str, Any] = {}

    def set(self, key: str, value: Any) -> None:
        self._store[key] = value

    def get(self, key: str) -> Optional[Any]:
        return self._store.get(key)

    def delete(self, key: str) -> bool:
        if key in self._store:
            del self._store[key]
            return True
        return False

    def exists(self, key: str) -> bool:
        return key in self._store

kv = KeyValueStore()
kv.set("name", "Nahrin")
kv.set("score", 100)
print(kv.get("name"))       # Nahrin
print(kv.get("missing"))    # None
print(kv.delete("score"))   # True
print(kv.delete("score"))   # False`},
    {title:"Tier 2: TTL Expiration",
     desc:"Add TTL support: SET_WITH_TTL <key> <value> <seconds>. Keys expire after TTL seconds and should return None on GET after expiry. Expired keys should not appear in any operation.",
     reqs:["SET_WITH_TTL <key> <value> <ttl_seconds>","GET returns None for expired keys","DELETE returns False for expired keys","Keys expire lazily (checked on access) OR eagerly (background cleanup)"],
     starter:`from typing import Any, Dict, Optional, Tuple
import time

class KeyValueStore:
    def __init__(self) -> None:
        self._store: Dict[str, Any] = {}
        self._expiry: Dict[str, float] = {}  # key — expiry timestamp

    def _is_expired(self, key: str) -> bool:
        if key not in self._expiry: return False
        if time.time() > self._expiry[key]:
            del self._store[key]
            del self._expiry[key]
            return True
        return False

    def set(self, key: str, value: Any) -> None:
        self._store[key] = value
        self._expiry.pop(key, None)  # Clear any existing TTL

    def set_with_ttl(self, key: str, value: Any, ttl_seconds: float) -> None:
        self._store[key] = value
        self._expiry[key] = time.time() + ttl_seconds

    def get(self, key: str) -> Optional[Any]:
        if self._is_expired(key): return None
        return self._store.get(key)

    def delete(self, key: str) -> bool:
        if self._is_expired(key): return False
        if key in self._store:
            del self._store[key]
            self._expiry.pop(key, None)
            return True
        return False

    def ttl(self, key: str) -> Optional[float]:
        """Returns remaining TTL in seconds, or None if no TTL / expired."""
        if self._is_expired(key): return None
        if key not in self._expiry: return None
        return max(0, self._expiry[key] - time.time())

import time
kv = KeyValueStore()
kv.set_with_ttl("session", "user123", 0.5)
print(kv.get("session"))    # user123
print(f"TTL: {kv.ttl('session'):.2f}s")
time.sleep(0.6)
print(kv.get("session"))    # None — expired`},
    {title:"Tier 3: Transactions (BEGIN / COMMIT / ROLLBACK)",
     desc:"Add transaction support. BEGIN starts a transaction. All SET/DELETE within a transaction are buffered. COMMIT applies them atomically. ROLLBACK discards them.",
     reqs:["BEGIN — starts transaction","COMMIT — applies all buffered ops atomically","ROLLBACK — discards all buffered ops","Nested transactions are NOT required","Within a transaction, GET should see buffered changes"],
     starter:`from typing import Any, Dict, Optional, List, Tuple
import time

class KeyValueStore:
    def __init__(self) -> None:
        self._store: Dict[str, Any] = {}
        self._expiry: Dict[str, float] = {}
        self._txn_buffer: Optional[Dict[str, Any]] = None  # None = no active txn
        self._txn_deletes: Optional[set] = None

    def _is_expired(self, key: str) -> bool:
        if key not in self._expiry: return False
        if time.time() > self._expiry[key]:
            del self._store[key]; del self._expiry[key]; return True
        return False

    def begin(self) -> bool:
        if self._txn_buffer is not None: return False  # Already in transaction
        self._txn_buffer = {}; self._txn_deletes = set()
        return True

    def commit(self) -> bool:
        if self._txn_buffer is None: return False
        for key in self._txn_deletes:
            self._store.pop(key, None); self._expiry.pop(key, None)
        self._store.update(self._txn_buffer)
        self._txn_buffer = None; self._txn_deletes = None
        return True

    def rollback(self) -> bool:
        if self._txn_buffer is None: return False
        self._txn_buffer = None; self._txn_deletes = None
        return True

    def set(self, key: str, value: Any) -> None:
        if self._txn_buffer is not None:
            self._txn_buffer[key] = value
            self._txn_deletes.discard(key)
        else:
            self._store[key] = value; self._expiry.pop(key, None)

    def get(self, key: str) -> Optional[Any]:
        if self._is_expired(key): return None
        if self._txn_buffer is not None:
            if key in self._txn_deletes: return None
            if key in self._txn_buffer: return self._txn_buffer[key]
        return self._store.get(key)

    def delete(self, key: str) -> bool:
        if self._txn_buffer is not None:
            if key not in self._store and key not in self._txn_buffer: return False
            self._txn_deletes.add(key); self._txn_buffer.pop(key, None); return True
        if key in self._store: del self._store[key]; self._expiry.pop(key, None); return True
        return False

kv = KeyValueStore()
kv.set("x", 10)
kv.begin()
kv.set("x", 99)
kv.set("y", 42)
print(kv.get("x"))  # 99 — sees buffered change
kv.rollback()
print(kv.get("x"))  # 10 — rolled back
print(kv.get("y"))  # None — rolled back
kv.begin(); kv.set("x", 50); kv.commit()
print(kv.get("x"))  # 50 — committed`},
    {title:"Tier 4: Prefix Scan & Persistence Snapshot",
     desc:"Add SCAN_PREFIX <prefix> returning all non-expired keys with that prefix. Add SNAPSHOT / RESTORE for point-in-time recovery (in-memory simulation, no disk I/O needed).",
     reqs:["SCAN_PREFIX <prefix> — sorted list of matching keys","SNAPSHOT <name> — saves current state","RESTORE <name> — restores to snapshot state","Snapshots must be independent copies (not references)","All previous tiers still work"],
     starter:`from typing import Any, Dict, Optional, List
import copy, time

class KeyValueStore:
    def __init__(self) -> None:
        self._store: Dict[str, Any] = {}
        self._expiry: Dict[str, float] = {}
        self._txn_buffer: Optional[Dict] = None
        self._txn_deletes: Optional[set] = None
        self._snapshots: Dict[str, Dict] = {}

    def _is_expired(self, key: str) -> bool:
        if key not in self._expiry: return False
        if time.time() > self._expiry[key]:
            del self._store[key]; del self._expiry[key]; return True
        return False

    def _clean_expired(self) -> None:
        expired = [k for k in list(self._expiry) if time.time() > self._expiry[k]]
        for k in expired: self._store.pop(k, None); self._expiry.pop(k, None)

    def set(self, key: str, value: Any) -> None:
        if self._txn_buffer is not None: self._txn_buffer[key] = value
        else: self._store[key] = value; self._expiry.pop(key, None)

    def get(self, key: str) -> Optional[Any]:
        if self._is_expired(key): return None
        if self._txn_buffer is not None:
            if key in (self._txn_deletes or set()): return None
            if key in self._txn_buffer: return self._txn_buffer[key]
        return self._store.get(key)

    def delete(self, key: str) -> bool:
        if self._is_expired(key): return False
        if self._txn_buffer is not None:
            if key not in self._store and key not in self._txn_buffer: return False
            self._txn_deletes.add(key); return True
        if key in self._store: del self._store[key]; self._expiry.pop(key, None); return True
        return False

    def begin(self) -> bool:
        if self._txn_buffer is not None: return False
        self._txn_buffer = {}; self._txn_deletes = set(); return True

    def commit(self) -> bool:
        if self._txn_buffer is None: return False
        for k in self._txn_deletes: self._store.pop(k,None); self._expiry.pop(k,None)
        self._store.update(self._txn_buffer)
        self._txn_buffer = None; self._txn_deletes = None; return True

    def rollback(self) -> bool:
        if self._txn_buffer is None: return False
        self._txn_buffer = None; self._txn_deletes = None; return True

    def scan_prefix(self, prefix: str) -> List[str]:
        self._clean_expired()
        return sorted(k for k in self._store if k.startswith(prefix))

    def snapshot(self, name: str) -> None:
        self._snapshots[name] = {
            "store": copy.deepcopy(self._store),
            "expiry": copy.deepcopy(self._expiry)
        }

    def restore(self, name: str) -> bool:
        if name not in self._snapshots: return False
        snap = self._snapshots[name]
        self._store = copy.deepcopy(snap["store"])
        self._expiry = copy.deepcopy(snap["expiry"])
        return True

kv = KeyValueStore()
for k,v in [("user:1","alice"),("user:2","bob"),("post:1","hello"),("user:3","carol")]:
    kv.set(k, v)
kv.snapshot("before_delete")
kv.delete("user:2")
print(kv.scan_prefix("user:"))   # ['user:1', 'user:3']
kv.restore("before_delete")
print(kv.scan_prefix("user:"))   # ['user:1', 'user:2', 'user:3']`},
   ]},
  {title:"Web Crawler",xp:450,time:"80 min",diff:"OA Format",isTiered:true,
   topic:"Anthropic's web crawler OA problem — BFS crawler, domain restriction, then multi-threaded version with thread safety",
   tiers:[
    {title:"Tier 1: Single-Threaded BFS Crawler",
     desc:"Given a helper get_links(url) that returns all hyperlinks on a page, implement crawl(seed_url) that returns all reachable unique URLs on the same domain.",
     reqs:["BFS traversal from seed URL","Domain restriction: only same domain as seed","Fragment handling: strip #fragment before deduplication","Returns set of all unique visited URLs"],
     starter:`from collections import deque
from urllib.parse import urlparse, urljoin, urldefrag
from typing import Set, List, Callable

# Simulated get_links for testing
_GRAPH = {
    "https://example.com": ["https://example.com/about", "https://example.com/blog", "https://other.com"],
    "https://example.com/about": ["https://example.com", "https://example.com/team"],
    "https://example.com/blog": ["https://example.com/blog/post1", "https://example.com/blog/post2"],
    "https://example.com/blog/post1": [],
    "https://example.com/blog/post2": ["https://example.com"],
    "https://example.com/team": [],
}
def get_links(url: str) -> List[str]:
    return _GRAPH.get(url, [])

def crawl(seed_url: str, get_links_fn: Callable = get_links) -> Set[str]:
    """BFS crawler — same domain only, fragments stripped."""
    seed_domain = urlparse(seed_url).netloc
    visited: Set[str] = set()
    queue: deque = deque([seed_url])
    visited.add(seed_url)

    while queue:
        url = queue.popleft()
        for raw_link in get_links_fn(url):
            # Strip fragment
            clean_link, _ = urldefrag(raw_link)
            # Domain restriction
            if urlparse(clean_link).netloc != seed_domain:
                continue
            if clean_link not in visited:
                visited.add(clean_link)
                queue.append(clean_link)

    return visited

result = crawl("https://example.com")
for url in sorted(result):
    print(url)`},
    {title:"Tier 2: Rate Limiting & Politeness",
     desc:"Add rate limiting: max N requests per second to the same domain. Add a seen_urls cache to avoid re-crawling. Add max_depth parameter to limit crawl depth.",
     reqs:["max_depth: don't crawl beyond N levels deep","rate_limit: max requests/sec per domain (use time.sleep)","url_filter: optional callable to skip certain URLs","Returns dict mapping url -> depth"],
     starter:`from collections import deque
from urllib.parse import urlparse, urldefrag
from typing import Set, Dict, Callable, Optional, List
import time

_GRAPH = {
    "https://example.com": ["https://example.com/about", "https://example.com/blog"],
    "https://example.com/about": ["https://example.com/team"],
    "https://example.com/blog": ["https://example.com/blog/post1"],
    "https://example.com/team": [],
    "https://example.com/blog/post1": [],
}
def get_links(url: str) -> List[str]: return _GRAPH.get(url, [])

def crawl(seed_url: str, max_depth: int = 3,
          rate_limit: float = 10.0,
          url_filter: Optional[Callable[[str], bool]] = None,
          get_links_fn: Callable = get_links) -> Dict[str, int]:
    """Returns dict of {url: depth_found_at}."""
    seed_domain = urlparse(seed_url).netloc
    visited: Dict[str, int] = {}
    queue: deque = deque([(seed_url, 0)])  # (url, depth)
    visited[seed_url] = 0
    last_request_time: Dict[str, float] = {}
    min_interval = 1.0 / rate_limit

    while queue:
        url, depth = queue.popleft()
        if depth >= max_depth: continue

        # Rate limiting per domain
        domain = urlparse(url).netloc
        now = time.time()
        elapsed = now - last_request_time.get(domain, 0)
        if elapsed < min_interval:
            time.sleep(min_interval - elapsed)
        last_request_time[domain] = time.time()

        for raw_link in get_links_fn(url):
            clean_link, _ = urldefrag(raw_link)
            if urlparse(clean_link).netloc != seed_domain: continue
            if url_filter and not url_filter(clean_link): continue
            if clean_link not in visited:
                visited[clean_link] = depth + 1
                queue.append((clean_link, depth + 1))

    return visited

result = crawl("https://example.com", max_depth=3, rate_limit=100)
for url, depth in sorted(result.items(), key=lambda x: x[1]):
    print(f"  depth {depth}: {url}")`},
    {title:"Tier 3: Multi-Threaded Concurrent Crawler",
     desc:"Rewrite crawl() using threading.ThreadPoolExecutor (or concurrent.futures). Multiple threads should fetch links in parallel. Must be thread-safe with no duplicate fetches.",
     reqs:["Use ThreadPoolExecutor with configurable worker count","Thread-safe visited set (use threading.Lock)","Same domain restriction and depth limiting","Should be significantly faster than single-threaded for large graphs"],
     starter:`from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.parse import urlparse, urldefrag
from typing import Set, Dict, Callable, Optional, List
from collections import deque
import threading, time

_GRAPH = {
    "https://example.com": [f"https://example.com/page{i}" for i in range(10)],
    **{f"https://example.com/page{i}": [f"https://example.com/sub{i}{j}" for j in range(3)] for i in range(10)},
    **{f"https://example.com/sub{i}{j}": [] for i in range(10) for j in range(3)},
}
def get_links(url: str) -> List[str]:
    time.sleep(0.01)  # Simulate network latency
    return _GRAPH.get(url, [])

def crawl_threaded(seed_url: str, max_depth: int = 3,
                   max_workers: int = 8,
                   get_links_fn: Callable = get_links) -> Dict[str, int]:
    """Thread-safe concurrent BFS crawler."""
    seed_domain = urlparse(seed_url).netloc
    visited: Dict[str, int] = {seed_url: 0}
    visited_lock = threading.Lock()
    results: Dict[str, int] = {seed_url: 0}

    def fetch(url: str, depth: int) -> List[tuple]:
        """Returns list of (new_url, new_depth) to enqueue."""
        if depth >= max_depth: return []
        new_urls = []
        for raw_link in get_links_fn(url):
            clean_link, _ = urldefrag(raw_link)
            if urlparse(clean_link).netloc != seed_domain: continue
            with visited_lock:
                if clean_link not in visited:
                    visited[clean_link] = depth + 1
                    results[clean_link] = depth + 1
                    new_urls.append((clean_link, depth + 1))
        return new_urls

    queue = [(seed_url, 0)]
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        while queue:
            futures = {executor.submit(fetch, url, depth): (url, depth)
                       for url, depth in queue}
            queue = []
            for future in as_completed(futures):
                queue.extend(future.result())

    return results

start = time.time()
result = crawl_threaded("https://example.com", max_depth=2, max_workers=8)
elapsed = time.time() - start
print(f"Crawled {len(result)} URLs in {elapsed:.2f}s")
print("Depths:", sorted(set(result.values())))`},
   ]},
  {title:"Inventory Management System",xp:450,time:"80 min",diff:"OA Format",isTiered:true,
   topic:"another real Anthropic OA problem — build an inventory system with progressive complexity, bulk operations, categories, audit trail",
   tiers:[
    {title:"Tier 1: Core Inventory Operations",
     desc:"Build an inventory system. ADD_ITEM, GET_ITEM, DELETE_ITEM, GET_ALL_ITEMS.",
     reqs:["ADD_ITEM <name> <quantity> — fails if name exists","GET_ITEM <name> — quantity or None","DELETE_ITEM <name> — True/False","GET_ALL_ITEMS — sorted list of (name, quantity) tuples"],
     starter:`from typing import Dict, List, Optional, Tuple

class Inventory:
    def __init__(self) -> None:
        self._items: Dict[str, int] = {}

    def add_item(self, name: str, quantity: int) -> bool:
        if name in self._items or quantity < 0:
            return False
        self._items[name] = quantity
        return True

    def get_item(self, name: str) -> Optional[int]:
        return self._items.get(name)

    def delete_item(self, name: str) -> bool:
        if name in self._items:
            del self._items[name]
            return True
        return False

    def get_all_items(self) -> List[Tuple[str, int]]:
        return sorted(self._items.items())

    def update_quantity(self, name: str, delta: int) -> Optional[int]:
        """Add delta to quantity (negative = reduce). Returns new quantity or None."""
        if name not in self._items: return None
        new_qty = self._items[name] + delta
        if new_qty < 0: return None
        self._items[name] = new_qty
        return new_qty

inv = Inventory()
inv.add_item("laptop", 10)
inv.add_item("mouse", 50)
inv.add_item("keyboard", 25)
print(inv.get_all_items())
inv.update_quantity("laptop", -3)
print(inv.get_item("laptop"))    # 7
print(inv.delete_item("mouse"))  # True
print(inv.get_all_items())`},
    {title:"Tier 2: COPY & Bulk Operations",
     desc:"Add COPY_ITEM <source> <dest> <quantity>, BULK_ADD from a list of (name, qty) pairs, and SEARCH_BY_QUANTITY_RANGE <min> <max>.",
     reqs:["COPY_ITEM copies quantity from source to new dest name","BULK_ADD is atomic — all succeed or none","SEARCH_BY_QUANTITY_RANGE returns items with qty in [min, max]","All Tier 1 operations still work"],
     starter:`from typing import Dict, List, Optional, Tuple

class Inventory:
    def __init__(self) -> None:
        self._items: Dict[str, int] = {}

    def add_item(self, name: str, quantity: int) -> bool:
        if name in self._items or quantity < 0: return False
        self._items[name] = quantity; return True

    def get_item(self, name: str) -> Optional[int]: return self._items.get(name)

    def delete_item(self, name: str) -> bool:
        if name in self._items: del self._items[name]; return True
        return False

    def update_quantity(self, name: str, delta: int) -> Optional[int]:
        if name not in self._items: return None
        new_qty = self._items[name] + delta
        if new_qty < 0: return None
        self._items[name] = new_qty; return new_qty

    def copy_item(self, source: str, dest: str, quantity: int) -> bool:
        if source not in self._items or dest in self._items: return False
        if self._items[source] < quantity: return False
        self._items[dest] = quantity
        self._items[source] -= quantity
        return True

    def bulk_add(self, items: List[Tuple[str, int]]) -> bool:
        """Atomic — validate ALL before applying ANY."""
        for name, qty in items:
            if name in self._items or qty < 0: return False
        for name, qty in items:
            self._items[name] = qty
        return True

    def search_by_quantity_range(self, min_qty: int, max_qty: int) -> List[Tuple[str, int]]:
        return sorted((n, q) for n, q in self._items.items() if min_qty <= q <= max_qty)

    def get_all_items(self) -> List[Tuple[str, int]]: return sorted(self._items.items())

inv = Inventory()
inv.bulk_add([("laptop", 10), ("mouse", 50), ("keyboard", 25), ("monitor", 8)])
inv.copy_item("mouse", "wireless_mouse", 20)
print(inv.get_item("mouse"))          # 30
print(inv.get_item("wireless_mouse")) # 20
print(inv.search_by_quantity_range(8, 25))`},
    {title:"Tier 3: Categories & Audit Log",
     desc:"Add item categories: ASSIGN_CATEGORY, GET_BY_CATEGORY. Add a full audit log: every operation is recorded with timestamp, operation type, and result.",
     reqs:["ASSIGN_CATEGORY <item> <category>","GET_BY_CATEGORY <category> — sorted items in category","GET_AUDIT_LOG — list of all operations with timestamps","Audit log is append-only and cannot be modified"],
     starter:`from typing import Dict, List, Optional, Tuple, Set
from dataclasses import dataclass, field
import time

@dataclass
class AuditEntry:
    operation: str; args: tuple; result: any; timestamp: float = field(default_factory=time.time)
    def __str__(self): return f"[{self.operation}] args={self.args} result={self.result}"

class Inventory:
    def __init__(self) -> None:
        self._items: Dict[str, int] = {}
        self._categories: Dict[str, str] = {}  # item -> category
        self._audit: List[AuditEntry] = []

    def _log(self, op: str, args: tuple, result) -> None:
        self._audit.append(AuditEntry(op, args, result))

    def add_item(self, name: str, quantity: int) -> bool:
        result = name not in self._items and quantity >= 0
        if result: self._items[name] = quantity
        self._log("ADD_ITEM", (name, quantity), result); return result

    def update_quantity(self, name: str, delta: int) -> Optional[int]:
        if name not in self._items: self._log("UPDATE_QTY", (name, delta), None); return None
        new_qty = self._items[name] + delta
        if new_qty < 0: self._log("UPDATE_QTY", (name, delta), None); return None
        self._items[name] = new_qty; self._log("UPDATE_QTY", (name, delta), new_qty); return new_qty

    def delete_item(self, name: str) -> bool:
        result = name in self._items
        if result: del self._items[name]; self._categories.pop(name, None)
        self._log("DELETE_ITEM", (name,), result); return result

    def assign_category(self, name: str, category: str) -> bool:
        if name not in self._items: self._log("ASSIGN_CAT", (name, category), False); return False
        self._categories[name] = category
        self._log("ASSIGN_CAT", (name, category), True); return True

    def get_by_category(self, category: str) -> List[Tuple[str, int]]:
        result = sorted((n, self._items[n]) for n, c in self._categories.items()
                        if c == category and n in self._items)
        self._log("GET_BY_CAT", (category,), len(result)); return result

    def get_audit_log(self) -> List[AuditEntry]: return list(self._audit)

    def get_all_items(self) -> List[Tuple[str, int]]: return sorted(self._items.items())

inv = Inventory()
inv.add_item("laptop", 10); inv.add_item("mouse", 50); inv.add_item("server", 5)
inv.assign_category("laptop", "computers"); inv.assign_category("server", "computers")
inv.assign_category("mouse", "peripherals")
print(inv.get_by_category("computers"))
for entry in inv.get_audit_log()[-4:]:
    print(entry)`},
   ]},
  {title:"File Cache System",xp:400,time:"75 min",diff:"OA Format",isTiered:true,
   topic:"Anthropic OA: build a constrained file cache — LRU eviction, size limits, access pattern tracking",
   tiers:[
    {title:"Tier 1: Basic Cache Read/Write",
     desc:"Build a simple file cache. CACHE_FILE <path> <content>, READ_FILE <path>, EVICT <path>.",
     reqs:["CACHE_FILE stores file content by path","READ_FILE returns content or None","EVICT removes file from cache","IS_CACHED returns bool"],
     starter:`from typing import Dict, Optional

class FileCache:
    def __init__(self) -> None:
        self._cache: Dict[str, str] = {}

    def cache_file(self, path: str, content: str) -> None:
        self._cache[path] = content

    def read_file(self, path: str) -> Optional[str]:
        return self._cache.get(path)

    def evict(self, path: str) -> bool:
        if path in self._cache:
            del self._cache[path]; return True
        return False

    def is_cached(self, path: str) -> bool:
        return path in self._cache

    def cache_size(self) -> int:
        return len(self._cache)

fc = FileCache()
fc.cache_file("/etc/config.json", '{"debug": true}')
fc.cache_file("/var/log/app.log", "error: timeout")
print(fc.read_file("/etc/config.json"))
print(fc.is_cached("/etc/config.json"))  # True
fc.evict("/etc/config.json")
print(fc.is_cached("/etc/config.json"))  # False`},
    {title:"Tier 2: LRU Eviction Policy",
     desc:"Add capacity limit. When cache is full and a new file is added, evict the Least Recently Used file. Reading a file counts as a 'use'.",
     reqs:["Constructor takes capacity: int","Auto-evict LRU when adding to full cache","READ_FILE updates recency","GET_LRU_ORDER returns files from least to most recently used"],
     starter:`from typing import Optional, List
from collections import OrderedDict

class FileCache:
    def __init__(self, capacity: int) -> None:
        self._capacity = capacity
        self._cache: OrderedDict[str, str] = OrderedDict()

    def cache_file(self, path: str, content: str) -> Optional[str]:
        """Returns evicted path if eviction occurred, else None."""
        evicted = None
        if path in self._cache:
            self._cache.move_to_end(path)
        else:
            if len(self._cache) >= self._capacity:
                evicted, _ = self._cache.popitem(last=False)  # Remove LRU
            self._cache[path] = content
        return evicted

    def read_file(self, path: str) -> Optional[str]:
        if path not in self._cache: return None
        self._cache.move_to_end(path)  # Mark as recently used
        return self._cache[path]

    def evict(self, path: str) -> bool:
        if path in self._cache: del self._cache[path]; return True
        return False

    def get_lru_order(self) -> List[str]:
        """First = LRU, Last = MRU."""
        return list(self._cache.keys())

    def is_cached(self, path: str) -> bool: return path in self._cache
    def cache_size(self) -> int: return len(self._cache)

fc = FileCache(capacity=3)
fc.cache_file("/a", "aaa"); fc.cache_file("/b", "bbb"); fc.cache_file("/c", "ccc")
fc.read_file("/a")  # /a becomes MRU
evicted = fc.cache_file("/d", "ddd")  # /b is LRU, gets evicted
print(f"Evicted: {evicted}")          # /b
print(fc.get_lru_order())             # ['/c', '/a', '/d']`},
    {title:"Tier 3: Size-Based Limits & Access Stats",
     desc:"Add size_limit_bytes: total bytes of content the cache can hold. Files larger than the limit are rejected. Add GET_ACCESS_STATS returning hit count, miss count, and hit rate.",
     reqs:["size_limit_bytes caps total content bytes (not file count)","Files exceeding remaining space trigger LRU eviction until space available","If single file > total limit, reject it","GET_ACCESS_STATS -> {hits, misses, hit_rate}"],
     starter:`from typing import Optional, List, Dict
from collections import OrderedDict

class FileCache:
    def __init__(self, capacity: int, size_limit_bytes: int) -> None:
        self._capacity = capacity
        self._size_limit = size_limit_bytes
        self._cache: OrderedDict[str, str] = OrderedDict()
        self._file_sizes: Dict[str, int] = {}
        self._current_bytes = 0
        self._hits = 0; self._misses = 0

    def _evict_lru(self) -> Optional[str]:
        if not self._cache: return None
        path, _ = self._cache.popitem(last=False)
        self._current_bytes -= self._file_sizes.pop(path, 0)
        return path

    def cache_file(self, path: str, content: str) -> bool:
        file_bytes = len(content.encode())
        if file_bytes > self._size_limit: return False
        if path in self._cache:
            self._current_bytes -= self._file_sizes[path]
            del self._cache[path]
        while (self._current_bytes + file_bytes > self._size_limit or
               len(self._cache) >= self._capacity):
            if not self._evict_lru(): return False
        self._cache[path] = content
        self._file_sizes[path] = file_bytes
        self._current_bytes += file_bytes
        return True

    def read_file(self, path: str) -> Optional[str]:
        if path not in self._cache: self._misses += 1; return None
        self._hits += 1
        self._cache.move_to_end(path)
        return self._cache[path]

    def get_access_stats(self) -> Dict:
        total = self._hits + self._misses
        return {"hits": self._hits, "misses": self._misses,
                "hit_rate": round(self._hits / total, 3) if total > 0 else 0.0,
                "bytes_used": self._current_bytes, "bytes_limit": self._size_limit}

fc = FileCache(capacity=100, size_limit_bytes=50)
fc.cache_file("/small", "hello")          # 5 bytes
fc.cache_file("/medium", "x" * 30)        # 30 bytes
print(fc.cache_file("/large", "y" * 100)) # False — too big
fc.read_file("/small"); fc.read_file("/small"); fc.read_file("/missing")
print(fc.get_access_stats())`},
   ]},
]},
{id:3,emoji:"🏛️",title:"System Design for Anthropic",color:"#f43f5e",
 desc:"Anthropic goes deeper than generic system design — LLM inference, distributed AI systems",
 levels:[
  {title:"Rate Limiting & API Design",xp:400,time:"90 min",diff:"Advanced",
   topic:"token bucket vs sliding window rate limiting, Anthropic's actual API rate limits, distributed rate limiting with Redis, API versioning, idempotency keys — directly relevant to building Claude's API",
   starter:`import time
from collections import deque
from typing import Dict, Optional, Tuple

class TokenBucketLimiter:
    """Allows burst traffic up to capacity, refills at refill_rate/sec."""
    def __init__(self, capacity: float, refill_rate: float) -> None:
        self.capacity = capacity
        self.refill_rate = refill_rate
        self.tokens = float(capacity)
        self.last_refill = time.monotonic()

    def allow(self, cost: float = 1.0) -> Tuple[bool, float]:
        now = time.monotonic()
        elapsed = now - self.last_refill
        self.tokens = min(self.capacity, self.tokens + elapsed * self.refill_rate)
        self.last_refill = now
        if self.tokens >= cost:
            self.tokens -= cost
            return True, self.tokens
        return False, self.tokens  # Denied, remaining tokens

class SlidingWindowLimiter:
    """Stricter than token bucket — no burst beyond window limit."""
    def __init__(self, max_requests: int, window_seconds: float) -> None:
        self.max_requests = max_requests
        self.window = window_seconds
        self.requests: deque = deque()

    def allow(self) -> Tuple[bool, int]:
        now = time.monotonic()
        while self.requests and now - self.requests[0] > self.window:
            self.requests.popleft()
        if len(self.requests) < self.max_requests:
            self.requests.append(now)
            return True, self.max_requests - len(self.requests)
        return False, 0

class AnthropicAPILimiter:
    """Combines token-based (for input tokens) and request-based limits."""
    def __init__(self) -> None:
        # Anthropic-like limits: 100K tokens/min, 50 req/min per API key
        self._token_limiter = TokenBucketLimiter(capacity=100_000, refill_rate=100_000/60)
        self._request_limiter = SlidingWindowLimiter(max_requests=50, window_seconds=60)

    def check_request(self, estimated_tokens: int) -> Tuple[bool, str]:
        req_allowed, req_remaining = self._request_limiter.allow()
        if not req_allowed:
            return False, "Rate limit: max 50 requests/minute exceeded"
        tok_allowed, tok_remaining = self._token_limiter.allow(cost=estimated_tokens)
        if not tok_allowed:
            return False, f"Rate limit: token budget exceeded (need {estimated_tokens})"
        return True, f"OK — {req_remaining} requests, {tok_remaining:.0f} tokens remaining"

limiter = AnthropicAPILimiter()
for i in range(5):
    allowed, msg = limiter.check_request(1000)
    print(f"Request {i+1}: {'OK' if allowed else 'DENIED'} {msg}")`},
  {title:"LLM Inference Architecture",xp:450,time:"100 min",diff:"Expert",
   topic:"how LLM inference actually works at scale — KV cache, batching strategies, model parallelism, speculative decoding, request routing — what Anthropic's infra team builds",
   starter:`from typing import List, Dict, Optional
from dataclasses import dataclass, field
from collections import defaultdict
import time, threading, queue

@dataclass
class InferenceRequest:
    request_id: str
    prompt_tokens: int
    max_output_tokens: int
    priority: int = 1  # 1=normal, 2=high
    created_at: float = field(default_factory=time.time)

@dataclass
class BatchedRequest:
    requests: List[InferenceRequest]
    total_prompt_tokens: int
    total_output_tokens: int

class KVCache:
    """Simulates Key-Value cache for transformer attention layers."""
    def __init__(self, max_seq_len: int = 8192, num_layers: int = 32) -> None:
        self.max_seq_len = max_seq_len
        self.num_layers = num_layers
        self._cache: Dict[str, int] = {}  # request_id -> cached token count

    def can_fit(self, request_id: str, new_tokens: int) -> bool:
        current = self._cache.get(request_id, 0)
        return current + new_tokens <= self.max_seq_len

    def allocate(self, request_id: str, tokens: int) -> bool:
        if not self.can_fit(request_id, tokens): return False
        self._cache[request_id] = self._cache.get(request_id, 0) + tokens
        return True

    def free(self, request_id: str) -> None:
        self._cache.pop(request_id, None)

    @property
    def utilization(self) -> float:
        total = sum(self._cache.values())
        return total / (self.max_seq_len * 4)  # 4 = simulated active slots

class DynamicBatcher:
    """Batches incoming requests for GPU efficiency."""
    def __init__(self, max_batch_size: int = 8, max_wait_ms: float = 50.0) -> None:
        self.max_batch_size = max_batch_size
        self.max_wait_ms = max_wait_ms
        self._queue: List[InferenceRequest] = []

    def add_request(self, req: InferenceRequest) -> None:
        self._queue.append(req)
        self._queue.sort(key=lambda r: (-r.priority, r.created_at))

    def get_batch(self) -> Optional[BatchedRequest]:
        if not self._queue: return None
        batch = self._queue[:self.max_batch_size]
        self._queue = self._queue[self.max_batch_size:]
        return BatchedRequest(
            requests=batch,
            total_prompt_tokens=sum(r.prompt_tokens for r in batch),
            total_output_tokens=sum(r.max_output_tokens for r in batch)
        )

batcher = DynamicBatcher(max_batch_size=4)
kv = KVCache()

for i in range(6):
    req = InferenceRequest(f"req_{i}", prompt_tokens=512, max_output_tokens=256,
                           priority=2 if i == 3 else 1)
    batcher.add_request(req)

batch = batcher.get_batch()
print(f"Batch: {[r.request_id for r in batch.requests]}")
print(f"Total tokens: {batch.total_prompt_tokens} prompt + {batch.total_output_tokens} output")
for req in batch.requests:
    kv.allocate(req.request_id, req.prompt_tokens + req.max_output_tokens)
print(f"KV Cache utilization: {kv.utilization:.1%}")`},
  {title:"Distributed Search at Scale",xp:500,time:"120 min",diff:"Expert",
   topic:"Anthropic's most common system design question — design distributed search for 1B docs at 1M QPS, sharding strategies, consistent hashing, caching layers, LLM retrieval integration",
   starter:`from typing import List, Dict, Optional, Tuple
from dataclasses import dataclass
import hashlib, time

@dataclass
class SearchResult:
    doc_id: str; score: float; snippet: str

class ConsistentHashRing:
    """Distributes documents/queries across shards with minimal remapping."""
    def __init__(self, num_shards: int, replicas: int = 150) -> None:
        self.num_shards = num_shards
        self.replicas = replicas
        self._ring: Dict[int, int] = {}  # hash_point -> shard_id
        self._sorted_keys: List[int] = []
        for shard_id in range(num_shards):
            for r in range(replicas):
                key = int(hashlib.md5(f"shard-{shard_id}-{r}".encode()).hexdigest(), 16)
                self._ring[key] = shard_id
        self._sorted_keys = sorted(self._ring.keys())

    def get_shard(self, doc_id: str) -> int:
        h = int(hashlib.md5(doc_id.encode()).hexdigest(), 16)
        for key in self._sorted_keys:
            if h <= key: return self._ring[key]
        return self._ring[self._sorted_keys[0]]

    def get_replica_shards(self, doc_id: str, n: int = 2) -> List[int]:
        """Returns n shards for replication."""
        primary = self.get_shard(doc_id)
        return [(primary + i) % self.num_shards for i in range(n)]

class QueryCache:
    """L1 cache for hot queries — reduces shard fan-out."""
    def __init__(self, ttl_seconds: float = 60.0) -> None:
        self._cache: Dict[str, Tuple[List[SearchResult], float]] = {}
        self.hits = 0; self.misses = 0

    def get(self, query: str) -> Optional[List[SearchResult]]:
        if query in self._cache:
            results, exp = self._cache[query]
            if time.time() < exp:
                self.hits += 1; return results
            del self._cache[query]
        self.misses += 1; return None

    def set(self, query: str, results: List[SearchResult], ttl: float = 60.0) -> None:
        self._cache[query] = (results, time.time() + ttl)

class DistributedSearchRouter:
    """Routes queries to correct shards, aggregates results."""
    def __init__(self, num_shards: int = 20) -> None:
        self.ring = ConsistentHashRing(num_shards)
        self.cache = QueryCache()
        self.num_shards = num_shards
        self._query_count = 0

    def route_query(self, query: str, top_k: int = 10) -> Dict:
        self._query_count += 1
        cached = self.cache.get(query)
        if cached:
            return {"results": cached, "from_cache": True, "shards_queried": 0}
        # Fan out to all shards for full-text search
        shards_to_query = list(range(self.num_shards))
        simulated_results = [
            SearchResult(f"doc_{i*100+j}", score=1.0/(i+1), snippet=f"Shard {i} result {j}")
            for i in shards_to_query[:3] for j in range(3)
        ]
        top_results = sorted(simulated_results, key=lambda r: r.score, reverse=True)[:top_k]
        self.cache.set(query, top_results)
        return {"results": top_results, "from_cache": False, "shards_queried": len(shards_to_query)}

router = DistributedSearchRouter(num_shards=20)
# First query — cache miss
r1 = router.route_query("constitutional AI safety")
print(f"Query 1: {len(r1['results'])} results, cached={r1['from_cache']}, shards={r1['shards_queried']}")
# Second same query — cache hit
r2 = router.route_query("constitutional AI safety")
print(f"Query 2: {len(r2['results'])} results, cached={r2['from_cache']}, shards={r2['shards_queried']}")
print(f"Cache stats: {router.cache.hits} hits / {router.cache.misses} misses")
# Test consistent hashing
for doc in ["doc_abc", "doc_xyz", "doc_123"]:
    print(f"{doc} -> shard {router.ring.get_shard(doc)}, replicas: {router.ring.get_replica_shards(doc)}")`},
]},
{id:4,emoji:"🎯",title:"Anthropic Mock Interviews",color:"#a855f7",
 desc:"Full simulations of Anthropic's actual interview format",
 levels:[
  {title:"90-Min OA Simulation",xp:600,time:"90 min",diff:"Mock",
   topic:"Full CodeSignal/CoderPad OA simulation — 4-tier progressive problem under timed conditions, clean Python, modular design, handling increasing complexity without rewriting",
   starter:`# ════════════════════════════════════════════════════════════
# ANTHROPIC OA SIMULATION — 90 MINUTES
# ════════════════════════════════════════════════════════════
# Build a Message Queue System (4 progressive tiers)
# Read ALL tiers before writing ANY code — design for Tier 4 from the start.
#
# TIER 1: Basic queue — PUSH <msg>, POP -> message, SIZE
# TIER 2: Priority queue — PUSH <msg> <priority>, POP returns highest priority
# TIER 3: Dead letter queue — messages that fail MAX_RETRIES go to DLQ
# TIER 4: Message groups — PUSH <msg> <priority> <group>,
#         POP <group> returns highest priority from that group
# ════════════════════════════════════════════════════════════

from typing import Optional, List, Dict, Tuple
from dataclasses import dataclass, field
import heapq, time

# —— DESIGN FIRST — then implement ——
# Before coding, answer these:
# 1. What data structure handles priority efficiently? (hint: heapq)
# 2. How do you track retries per message?
# 3. How do you partition by group without duplicating queue logic?
# 4. What error handling do you need?

@dataclass(order=True)
class Message:
    priority: int          # Higher = more important (use negative for min-heap)
    message_id: int        # Tiebreaker — FIFO within same priority
    content: str = field(compare=False)
    group: str = field(compare=False, default="default")
    retries: int = field(compare=False, default=0)
    created_at: float = field(compare=False, default_factory=time.time)

class MessageQueue:
    MAX_RETRIES = 3

    def __init__(self) -> None:
        self._heap: List[Tuple] = []    # (neg_priority, msg_id, Message)
        self._dlq: List[Message] = []   # Dead letter queue
        self._counter = 0               # Message ID counter (ensures FIFO)
        self._groups: Dict[str, List] = {}  # group -> heap

    def push(self, content: str, priority: int = 0, group: str = "default") -> int:
        """Returns message_id."""
        self._counter += 1
        msg = Message(-priority, self._counter, content, group)
        heapq.heappush(self._heap, (msg.priority, msg.message_id, msg))
        if group not in self._groups:
            self._groups[group] = []
        heapq.heappush(self._groups[group], (msg.priority, msg.message_id, msg))
        return self._counter

    def pop(self, group: Optional[str] = None) -> Optional[Message]:
        """Pop highest priority message, optionally from a specific group."""
        target_heap = self._groups.get(group, []) if group else self._heap
        if not target_heap: return None
        _, _, msg = heapq.heappop(target_heap)
        return msg

    def nack(self, msg: Message) -> bool:
        """Negative acknowledgment — retry or send to DLQ."""
        msg.retries += 1
        if msg.retries >= self.MAX_RETRIES:
            self._dlq.append(msg); return False  # Sent to DLQ
        self.push(msg.content, -msg.priority, msg.group); return True  # Retried

    def get_dlq(self) -> List[Message]: return list(self._dlq)
    def size(self, group: Optional[str] = None) -> int:
        return len(self._groups.get(group, [])) if group else len(self._heap)

# YOUR IMPLEMENTATION TESTS:
mq = MessageQueue()
mq.push("low priority task", priority=1, group="jobs")
mq.push("urgent task", priority=10, group="jobs")
mq.push("normal task", priority=5, group="alerts")

msg = mq.pop("jobs")
print(f"Got: '{msg.content}' (priority={-msg.priority})")  # urgent task

# Test DLQ
msg2 = mq.pop("jobs")
for _ in range(3): mq.nack(msg2)  # Exhaust retries
print(f"DLQ: {[m.content for m in mq.get_dlq()]}")`},
  {title:"Onsite Loop Simulation",xp:700,time:"120 min",diff:"Mock",
   topic:"Full Anthropic onsite — coding round (practical Python problem) + system design (LLM inference) + values alignment discussion, Anthropic's 5 evaluation criteria",
   starter:`# ════════════════════════════════════════════════════════════
# ANTHROPIC ONSITE SIMULATION
# ════════════════════════════════════════════════════════════
# PART 1 (45 min): Practical coding — implement a simple agent loop
# PART 2 (30 min): System design — see lesson tab
# PART 3 (15 min): Values alignment — see lesson tab
# ════════════════════════════════════════════════════════════

# PART 1: Agent Loop with Tool Use
# Build a simple agent that can use tools to answer questions.
# The agent should: call tools, handle tool results, retry on failure,
# and stop when it has a final answer.

from typing import Dict, Any, List, Optional, Callable
from dataclasses import dataclass, field
from enum import Enum
import json

class StopReason(Enum):
    TOOL_USE = "tool_use"
    END_TURN = "end_turn"
    MAX_TURNS = "max_turns"
    ERROR = "error"

@dataclass
class ToolCall:
    name: str
    arguments: Dict[str, Any]
    call_id: str

@dataclass
class AgentMessage:
    role: str   # "user", "assistant", "tool_result"
    content: str
    tool_call: Optional[ToolCall] = None
    tool_result: Optional[str] = None

class Tool:
    def __init__(self, name: str, description: str, fn: Callable) -> None:
        self.name = name
        self.description = description
        self._fn = fn

    def execute(self, **kwargs) -> str:
        try:
            return str(self._fn(**kwargs))
        except Exception as e:
            return f"Error: {e}"

class SimpleAgent:
    """
    Minimal agent loop — similar to what Anthropic engineers build.
    In real Anthropic code, this calls the Claude API.
    Here, we simulate the loop logic without the API.
    """
    MAX_TURNS = 10

    def __init__(self, tools: List[Tool]) -> None:
        self._tools: Dict[str, Tool] = {t.name: t for t in tools}
        self._history: List[AgentMessage] = []
        self._turn_count = 0

    def _get_tool_call_from_response(self, response: str) -> Optional[ToolCall]:
        """Simulate parsing tool calls from LLM response."""
        # In production: parse Claude's API response for tool_use blocks
        if "TOOL:" not in response: return None
        try:
            _, tool_part = response.split("TOOL:", 1)
            name, args_str = tool_part.strip().split(" ", 1)
            return ToolCall(name=name.strip(), arguments=json.loads(args_str), call_id=f"call_{self._turn_count}")
        except: return None

    def _execute_tool(self, tool_call: ToolCall) -> str:
        if tool_call.name not in self._tools:
            return f"Unknown tool: {tool_call.name}"
        return self._tools[tool_call.name].execute(**tool_call.arguments)

    def run(self, user_message: str) -> str:
        self._history.append(AgentMessage("user", user_message))
        # Simulate agent turns
        simulated_responses = [
            'TOOL: calculator {"expression": "15 * 23 + 7"}',
            "Final answer: 352"
        ]
        for resp in simulated_responses:
            self._turn_count += 1
            if self._turn_count > self.MAX_TURNS:
                return "Max turns reached"
            tool_call = self._get_tool_call_from_response(resp)
            if tool_call:
                result = self._execute_tool(tool_call)
                self._history.append(AgentMessage("assistant", resp, tool_call=tool_call))
                self._history.append(AgentMessage("tool_result", result, tool_result=result))
                print(f"  Turn {self._turn_count}: Used {tool_call.name} -> {result}")
            else:
                self._history.append(AgentMessage("assistant", resp))
                return resp
        return "No answer reached"

# Define tools
calc_tool = Tool("calculator", "Evaluate math expressions",
                  lambda expression: eval(expression, {"__builtins__": {}}, {}))

agent = SimpleAgent(tools=[calc_tool])
result = agent.run("What is 15 * 23 + 7?")
print(f"Agent answer: {result}")
print(f"Total turns: {agent._turn_count}")
print(f"History length: {len(agent._history)} messages")`},
]},
];

const TOTAL_LEVELS = PHASES.reduce((s,p)=>s+p.levels.length,0);
const TOTAL_XP = PHASES.reduce((s,p)=>p.levels.reduce((ss,l)=>ss+l.xp,s),0);

const RANKS = [
  {min:0,title:"Applicant 📋",next:700},
  {min:700,title:"OA Passer ✓",next:1500},
  {min:1500,title:"Tech Screen Ready 💬",next:2800},
  {min:2800,title:"Onsite Contender 💼",next:4500},
  {min:4500,title:"Anthropic Engineer 🎯",next:99999},
];
const getRank = xp => RANKS.filter(r=>xp>=r.min).pop();

const READINESS = [
  {min:0, label:"Keep Building", color:"#ef4444", advice:"Complete Machine Foundations first — it's what makes your reasoning stand out."},
  {min:20,label:"OA Ready", color:"#f59e0b", advice:"You can attempt Anthropic's CodeSignal OA. Focus on clean, modular Python."},
  {min:45,label:"Tech Screen Ready", color:"#eab308", advice:"Strong candidate for the 60-min technical screen. Complete all OA Practice tiers."},
  {min:70,label:"Onsite Ready", color:"#22c55e", advice:"Ready for the full onsite loop. Study the system design levels deeply."},
  {min:90,label:"Apply to Anthropic Now 🎯", color:"#00c8ff", advice:"Your preparation matches what Anthropic looks for. Apply this week at anthropic.com/careers"},
];
const getReadiness = (xp,done) => {
  const score = Math.round((xp/TOTAL_XP)*50 + (Object.keys(done).length/TOTAL_LEVELS)*50);
  return {score, ...READINESS.filter(r=>score>=r.min).pop()};
};

// ── AI GENERATION ────────────────────────────────────────────
async function generateLesson(phase, level) {
  const isTiered = level.isTiered ? `\nIMPORTANT: This is a multi-tier OA problem. The lesson should explain the overall design strategy for ALL tiers, what data structures to choose upfront, and why Anthropic tests this exact problem type.` : '';
  const prompt = `You are Professor Chen, a Stanford CS professor and former Anthropic engineer. You helped design Anthropic's interview process.

Generate a focused lesson on: **${level.topic}**
Phase: "${phase.title}" | Level: "${level.title}"
${isTiered}

Format EXACTLY:

# ${level.title}

[2 sentences: why Anthropic specifically cares about this topic]

## Core Concept

[Explanation with Python code]

## The Anthropic Angle

[What Anthropic engineers look for — specific to this topic]

## Common Mistakes Anthropic Sees

[2-3 bullet points of what candidates get wrong]

## Key Code Pattern

[1 clean Python code block showing the essential pattern]

Total: 300-400 words. Be direct and practical. No fluff.`;

  const res = await fetch("/api/claude",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:900,messages:[{role:"user",content:prompt}]})
  });
  const d = await res.json();
  return d.content?.[0]?.text || "Error loading lesson.";
}

async function generateHint(phase, level, code, currentTier) {
  const tierInfo = currentTier !== undefined ? `\nStudent is working on Tier ${currentTier+1}: "${level.tiers?.[currentTier]?.title}"` : '';
  const prompt = `You are Professor Chen, former Anthropic engineer. Give Socratic coaching — NEVER give the answer directly.

Level: "${level.title}"${tierInfo}
Student's code:
\`\`\`python
${code}
\`\`\`

Give exactly 3 short paragraphs:
1. What's good about the structure
2. One Socratic question that points to the issue (don't name the fix)
3. One concrete next micro-step (not the solution)

Max 150 words. Be the mentor they needed.`;

  const res = await fetch("/api/claude",{
    method:"POST",headers:{"Content-Type":"application/json"},
    body:JSON.stringify({model:"claude-sonnet-4-20250514",max_tokens:300,messages:[{role:"user",content:prompt}]})
  });
  const d = await res.json();
  return d.content?.[0]?.text || "Error loading feedback.";
}

// ── MARKDOWN RENDERER ────────────────────────────────────────
function MD({text,T}) {
  if (!text) return null;
  const lines = text.split('\n');
  const els=[]; let codeLines=[]; let inCode=false; let key=0;
  for (const line of lines) {
    if (line.startsWith('```')) {
      if (inCode) {
        els.push(<pre key={key++} style={{background:T.edbg,border:`1px solid ${T.border}`,borderRadius:6,padding:"12px 16px",fontFamily:F.code,fontSize:12,lineHeight:1.65,overflowX:"auto",margin:"10px 0",color:T.edtx,whiteSpace:"pre"}}>{codeLines.join('\n')}</pre>);
        codeLines=[]; inCode=false;
      } else inCode=true;
    } else if (inCode) { codeLines.push(line); }
    else if (line.startsWith('# ')) els.push(<h1 key={key++} style={{fontFamily:F.head,fontSize:16,color:T.accent,margin:"0 0 14px",letterSpacing:"-0.01em"}}>{line.slice(2)}</h1>);
    else if (line.startsWith('## ')) els.push(<h2 key={key++} style={{fontFamily:F.head,fontSize:13,color:T.text,margin:"18px 0 8px",letterSpacing:"0.02em"}}>{line.slice(3)}</h2>);
    else if (line.startsWith('### ')) els.push(<h3 key={key++} style={{fontSize:13,fontWeight:700,color:T.accent2,margin:"14px 0 6px"}}>{line.slice(4)}</h3>);
    else if (line.match(/^[-*] /)) {
      const html = line.slice(2).replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,`<code style="background:${T.edbg};padding:1px 5px;border-radius:3px;font-family:JetBrains Mono,monospace;font-size:11px;color:${T.accent3}">$1</code>`);
      els.push(<div key={key++} style={{display:"flex",gap:8,margin:"4px 0",fontSize:13,lineHeight:1.7}}><span style={{color:T.accent,flexShrink:0}}>›</span><span dangerouslySetInnerHTML={{__html:html}}/></div>);
    } else if (line.trim()==='') els.push(<div key={key++} style={{height:6}}/>);
    else if (line.trim()) {
      const html = line.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/`([^`]+)`/g,`<code style="background:${T.edbg};padding:1px 5px;border-radius:3px;font-size:11px;color:${T.accent3}">$1</code>`);
      els.push(<p key={key++} style={{margin:"3px 0",fontSize:13,color:T.text,lineHeight:1.8}} dangerouslySetInnerHTML={{__html:html}}/>);
    }
  }
  return <div>{els}</div>;
}

// ── TIERED CHALLENGE ─────────────────────────────────────────
function TieredChallenge({level, lKey, tierProgress, onTierComplete, onLoadStarter, T}) {
  const completedTiers = tierProgress[lKey] || 0;
  const [viewingTier, setViewingTier] = useState(completedTiers);
  const currentTierData = level.tiers[viewingTier];

  const handleViewTier = (idx) => {
    setViewingTier(idx);
    onLoadStarter(level.tiers[idx].starter);
  };

  return (
    <div>
      {/* Tier progress bar */}
      <div style={{display:"flex",gap:0,marginBottom:16,borderRadius:6,overflow:"hidden",border:`1px solid ${T.border}`}}>
        {level.tiers.map((t,i)=>{
          const isComplete = i < completedTiers;
          const isCurrent = i === completedTiers && i === viewingTier;
          const isViewing = i === viewingTier;
          const isLocked = i > completedTiers;
          return(
            <button key={i} onClick={()=>!isLocked && handleViewTier(i)} style={{
              flex:1,padding:"7px 4px",fontSize:11,fontWeight:isViewing?700:400,
              background:isComplete?`${T.success}20`:isCurrent?`${T.accent}15`:isViewing?`${T.accent2}10`:T.card,
              color:isComplete?T.success:isCurrent?T.accent:isLocked?T.muted:T.text,
              border:"none",borderRight:i<level.tiers.length-1?`1px solid ${T.border}`:"none",
              cursor:isLocked?"not-allowed":"pointer",fontFamily:F.body,
              display:"flex",alignItems:"center",justifyContent:"center",gap:4,transition:"all .15s"
            }}>
              {isComplete ? "✓" : isLocked ? "🔒" : `${i+1}`}
              <span style={{display:"none"}}>T{i+1}</span>
            </button>
          );
        })}
      </div>

      {/* Current tier info */}
      <div style={{background:T.tier,border:`1px solid ${T.border}`,borderRadius:8,padding:16,marginBottom:14}}>
        <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:10}}>
          <div style={{padding:"2px 8px",fontSize:10,fontWeight:700,background:`${T.accent}15`,color:T.accent,borderRadius:4,fontFamily:F.head,letterSpacing:"0.05em"}}>
            TIER {viewingTier+1} / {level.tiers.length}
          </div>
          {viewingTier < completedTiers && <div style={{padding:"2px 8px",fontSize:10,fontWeight:700,background:`${T.success}15`,color:T.success,borderRadius:4}}>COMPLETED</div>}
          {viewingTier === completedTiers && <div style={{padding:"2px 8px",fontSize:10,fontWeight:700,background:`${T.accent}20`,color:T.accent,borderRadius:4}}>ACTIVE</div>}
        </div>
        <div style={{fontSize:14,fontWeight:700,color:T.text,marginBottom:8,fontFamily:F.head}}>{currentTierData.title}</div>
        <p style={{fontSize:13,color:T.muted,lineHeight:1.7,margin:"0 0 12px"}}>{currentTierData.desc}</p>
        <div style={{fontSize:11,fontWeight:700,color:T.muted,textTransform:"uppercase",letterSpacing:"0.08em",marginBottom:8}}>Requirements:</div>
        {currentTierData.reqs.map((r,i)=>(
          <div key={i} style={{display:"flex",gap:7,margin:"3px 0",fontSize:12,color:T.text}}>
            <span style={{color:T.accent2,flexShrink:0}}>›</span><span style={{fontFamily:F.code,fontSize:11}}>{r}</span>
          </div>
        ))}
      </div>

      {/* Tier navigation */}
      <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
        {viewingTier > 0 && (
          <button onClick={()=>handleViewTier(viewingTier-1)} style={{padding:"5px 12px",fontSize:11,color:T.muted,background:"transparent",border:`1px solid ${T.border}`,borderRadius:4,cursor:"pointer"}}>
            ← Tier {viewingTier}
          </button>
        )}
        {viewingTier < completedTiers && viewingTier < level.tiers.length-1 && (
          <button onClick={()=>handleViewTier(viewingTier+1)} style={{padding:"5px 12px",fontSize:11,color:T.accent,background:`${T.accent}10`,border:`1px solid ${T.accent}25`,borderRadius:4,cursor:"pointer"}}>
            Tier {viewingTier+2} →
          </button>
        )}
        {viewingTier === completedTiers && completedTiers < level.tiers.length && (
          <button onClick={()=>onTierComplete(viewingTier)} style={{padding:"5px 14px",fontSize:12,fontWeight:700,color:T.bg,background:T.success,border:"none",borderRadius:4,cursor:"pointer"}}>
            ✓ Pass Tier {viewingTier+1} — Unlock Next
          </button>
        )}
        {completedTiers >= level.tiers.length && (
          <div style={{padding:"5px 12px",fontSize:12,color:T.success,background:`${T.success}10`,border:`1px solid ${T.success}30`,borderRadius:4}}>
            🎉 All {level.tiers.length} tiers complete!
          </div>
        )}
      </div>
    </div>
  );
}

// ── ANALYTICS ────────────────────────────────────────────────
function Analytics({xp,done,T}) {
  const rank=getRank(xp); const rd=getReadiness(xp,done);
  const total=Object.keys(done).length;
  const xpPct=rank.next===99999?100:Math.min(100,Math.round(xp/rank.next*100));
  return(
    <div style={{padding:24,maxWidth:860,margin:"0 auto"}}>
      <h2 style={{fontFamily:F.head,fontSize:18,color:T.accent,marginBottom:4,letterSpacing:"-0.02em"}}>Anthropic Readiness</h2>
      <p style={{fontSize:13,color:T.muted,marginBottom:20}}>Track your progress toward Anthropic's interview bar.</p>

      <div style={{background:T.card,border:`2px solid ${rd.color}30`,borderRadius:12,padding:24,marginBottom:18}}>
        <div style={{display:"flex",gap:24,alignItems:"flex-start",flexWrap:"wrap"}}>
          <div>
            <div style={{fontSize:10,textTransform:"uppercase",letterSpacing:"0.1em",color:T.muted,marginBottom:6}}>Readiness Score</div>
            <div style={{fontSize:58,fontWeight:800,fontFamily:F.code,color:rd.color,lineHeight:1}}>{rd.score}%</div>
            <div style={{fontSize:16,fontWeight:700,color:rd.color,marginTop:4}}>{rd.label}</div>
            <div style={{fontSize:12,color:T.muted,marginTop:2}}>{total}/{TOTAL_LEVELS} levels · {xp} XP</div>
          </div>
          <div style={{background:T.surface,borderRadius:10,padding:"14px 18px",flex:1,minWidth:200}}>
            <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",color:T.muted,marginBottom:8}}>Professor Chen's Assessment</div>
            <p style={{fontSize:13,color:T.text,lineHeight:1.75,margin:0}}>{rd.advice}</p>
            {rd.score>=90&&<a href="https://www.anthropic.com/careers" target="_blank" rel="noopener noreferrer" style={{display:"inline-block",marginTop:12,padding:"6px 14px",fontSize:12,fontWeight:700,background:T.accent,color:T.bg,borderRadius:5,textDecoration:"none"}}>Apply at Anthropic →</a>}
          </div>
        </div>
      </div>

      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:20,marginBottom:18}}>
        <div style={{fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:"0.08em",color:T.muted,marginBottom:16}}>Phase Progress</div>
        {PHASES.map((ph,i)=>{
          const comp=ph.levels.filter((_,li)=>done[`${ph.id}-${li}`]).length;
          const pct=Math.round(comp/ph.levels.length*100);
          return(<div key={i} style={{marginBottom:16}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:6}}>
              <span style={{fontSize:13,color:T.text,fontWeight:500}}>{ph.emoji} {ph.title}</span>
              <div style={{display:"flex",alignItems:"center",gap:10}}>
                <span style={{fontSize:11,color:T.muted}}>{ph.desc}</span>
                <span style={{fontSize:12,color:ph.color,fontWeight:700}}>{comp}/{ph.levels.length}</span>
              </div>
            </div>
            <div style={{height:6,background:T.border,borderRadius:3,overflow:"hidden"}}>
              <div style={{height:"100%",width:`${pct}%`,background:ph.color,borderRadius:3,transition:"width .5s"}}/>
            </div>
          </div>);
        })}
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:18}}>
          <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",color:T.muted,marginBottom:10}}>Current Rank</div>
          <div style={{fontSize:22,fontWeight:800,fontFamily:F.head,color:T.accent,marginBottom:8}}>{rank.title}</div>
          <div style={{height:5,background:T.border,borderRadius:3,overflow:"hidden",marginBottom:6}}>
            <div style={{height:"100%",width:`${xpPct}%`,background:`linear-gradient(90deg,${T.accent},${T.accent2})`,borderRadius:3}}/>
          </div>
          <div style={{fontSize:12,color:T.muted}}>{xp} / {rank.next===99999?"MAX":rank.next} XP</div>
        </div>
        <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:12,padding:18}}>
          <div style={{fontSize:11,textTransform:"uppercase",letterSpacing:"0.08em",color:T.muted,marginBottom:10}}>Anthropic Interview Stages</div>
          {[["Recruiter Screen",true],["CodeSignal OA (90 min)",total>=5],["Technical Screen",total>=10],["Onsite Loop (4 rounds)",total>=14],["Offer 🎉",total>=16]].map(([stage,ready])=>(
            <div key={stage} style={{display:"flex",alignItems:"center",gap:8,margin:"5px 0",fontSize:12}}>
              <span style={{color:ready?T.success:T.muted,fontSize:13}}>{ready?"✓":"○"}</span>
              <span style={{color:ready?T.text:T.muted}}>{stage}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── MAIN APP ─────────────────────────────────────────────────
export default function AnthropicPrep() {
  const [dark,setDark]=useState(true); const T=dark?DARK:LIGHT;
  const [pi,setPi]=useState(0); const [li,setLi]=useState(0);
  const [tab,setTab]=useState('lesson');
  const [mode,setMode]=useState('learn'); // 'learn'|'analytics'
  const [code,setCode]=useState('');
  const [output,setOutput]=useState(null); const [running,setRunning]=useState(false);
  const [lesson,setLesson]=useState(''); const [loadingLesson,setLoadingLesson]=useState(false);
  const [profOpen,setProfOpen]=useState(false); const [profMsg,setProfMsg]=useState(''); const [askingProf,setAskingProf]=useState(false);
  const [xp,setXp]=useState(0); const [done,setDone]=useState({});
  const [tierProgress,setTierProgress]=useState({}); // {lKey: completedTierCount}
  const [sidebar,setSidebar]=useState(true);
  const [loaded,setLoaded]=useState(false);
  const [justRan,setJustRan]=useState(false);
  const [tts,setTts]=useState('idle');
  const audioRef=useRef(null);
  const taRef=useRef(null);

  const phase=PHASES[pi]; const level=phase?.levels[li];
  const lKey=`${pi}-${li}`;
  const isDone=done[lKey];
  const rank=getRank(xp); const rd=getReadiness(xp,done);
  const xpPct=Math.min(100,rank.next===99999?100:Math.round(xp/rank.next*100));
  const currentTierIdx = tierProgress[lKey] || 0;

  const stopAudio=useCallback(()=>{
    if(audioRef.current){audioRef.current.pause();audioRef.current.src='';audioRef.current=null;}
    setTts('idle');
  },[]);

  useEffect(()=>{
    try{const r=localStorage.getItem('anthropicPrep');if(r){const d=JSON.parse(r);setXp(d.xp||0);setDone(d.done||{});setDark(d.dark??true);setTierProgress(d.tierProgress||{});if(d.pi!=null)setPi(d.pi);if(d.li!=null)setLi(d.li);}}catch(e){}
    setLoaded(true);
  },[]);

  useEffect(()=>{
    if(!level)return;
    stopAudio();
    setCode(level.isTiered ? level.tiers[tierProgress[lKey]||0].starter : level.starter);
    setOutput(null); setLesson(''); setProfOpen(false); setProfMsg(''); setJustRan(false);
  },[pi,li]);

  useEffect(()=>()=>stopAudio(),[stopAudio]);

  const save=(nx,nd,ntp,np,nl,ndk)=>{
    try{localStorage.setItem('anthropicPrep',JSON.stringify({xp:nx,done:nd,tierProgress:ntp,pi:np,li:nl,dark:ndk??dark}));}catch(e){}
  };

  useEffect(()=>{
    if(mode==='learn'&&tab==='lesson'&&!lesson&&level) loadLesson();
  },[pi,li,tab,mode]);

  const loadLesson=async()=>{
    setLoadingLesson(true);
    const text=await generateLesson(phase,level);
    setLesson(text); setLoadingLesson(false);
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

  const runCode=async()=>{
    if(!code.trim()||running)return;
    setRunning(true); setOutput({type:'loading',text:'⏳ Executing Python 3.10...'});
    try{
      const r=await fetch('https://emkc.org/api/v2/piston/execute',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({language:'python',version:'3.10.0',files:[{name:'s.py',content:code}],run_timeout:10000})});
      const d=await r.json();
      const out=(d.run?.stdout||'').trim(); const err=(d.run?.stderr||'').trim();
      if(err)setOutput({type:'error',text:err});
      else{setOutput({type:'success',text:out||'(no output — add print() calls!)'}); setJustRan(true);}
    }catch(e){setOutput({type:'error',text:'Network error.'});}
    setRunning(false);
  };

  const askProf=async()=>{
    setAskingProf(true); setProfOpen(true); setProfMsg('');
    const ct = level?.isTiered ? currentTierIdx : undefined;
    const text=await generateHint(phase,level,code,ct);
    setProfMsg(text); setAskingProf(false);
  };

  const completeLevel=()=>{
    if(isDone)return;
    const nx=xp+level.xp; const nd={...done,[lKey]:true};
    setXp(nx); setDone(nd);
    let np=pi,nl=li;
    if(li<phase.levels.length-1)nl=li+1;
    else if(pi<PHASES.length-1){np=pi+1;nl=0;}
    save(nx,nd,tierProgress,np,nl);
    setTimeout(()=>{setPi(np);setLi(nl);},1200);
  };

  const handleTierComplete=(tierIdx)=>{
    const newTierCount = tierIdx + 1;
    const newTp = {...tierProgress,[lKey]:newTierCount};
    setTierProgress(newTp);
    if(newTierCount >= level.tiers.length){
      completeLevel();
    } else {
      const nextTierStarter = level.tiers[newTierCount].starter;
      setCode(nextTierStarter);
      setOutput(null); setJustRan(false);
      save(xp,done,newTp,pi,li);
    }
  };

  const handleLoadStarter=(starter)=>{
    setCode(starter); setOutput(null); setJustRan(false);
  };

  if(!loaded)return(
    <div style={{background:DARK.bg,height:'100vh',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:F.head}}>
      <div style={{textAlign:'center'}}><div style={{fontSize:48,marginBottom:12}}>🎯</div><div style={{fontSize:13,color:DARK.accent,letterSpacing:'0.15em'}}>LOADING YOUR PREP...</div></div>
    </div>
  );

  return(
    <div style={{background:T.bg,color:T.text,height:'100vh',display:'flex',flexDirection:'column',overflow:'hidden',fontFamily:F.body}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Outfit:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap');*{box-sizing:border-box;margin:0;padding:0}::-webkit-scrollbar{width:4px}::-webkit-scrollbar-thumb{background:${T.border};border-radius:2px}.nav-item:hover{background:${T.card}!important}button{font-family:inherit;transition:all .12s}textarea{resize:none;outline:none;tab-size:4}`}</style>

      {/* TOP BAR */}
      <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,height:48,display:'flex',alignItems:'center',padding:'0 12px',gap:10,flexShrink:0}}>
        <button onClick={()=>setSidebar(!sidebar)} style={{background:'none',border:'none',cursor:'pointer',color:T.muted,fontSize:16,padding:'4px 6px'}}>☰</button>
        <div style={{fontFamily:F.head,fontSize:14,color:T.accent,letterSpacing:'-0.01em',fontWeight:800}}>ANTHROPIC<span style={{color:T.accent2}}>⚡</span>PREP</div>
        <div style={{height:16,width:1,background:T.border}}/>
        {[{id:'learn',l:'📚 Learn'},{id:'analytics',l:'📊 Readiness'}].map(m=>(
          <button key={m.id} onClick={()=>setMode(m.id)} style={{padding:'4px 10px',fontSize:12,border:`1px solid ${mode===m.id?T.accent:T.border}`,borderRadius:4,background:mode===m.id?`${T.accent}12`:'transparent',color:mode===m.id?T.accent:T.muted,cursor:'pointer'}}>
            {m.l}
          </button>
        ))}
        {mode==='learn'&&<><div style={{height:16,width:1,background:T.border}}/><div style={{fontSize:12,color:T.muted,flex:1,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}><span style={{color:phase.color,fontWeight:600}}>{phase.emoji} {phase.title}</span><span style={{color:T.border}}> › </span><span>{level?.title}</span>{isDone&&<span style={{color:T.success,marginLeft:5}}>✓</span>}{level?.isTiered&&<span style={{marginLeft:6,fontSize:11,color:T.accent2,background:`${T.accent2}12`,padding:'1px 6px',borderRadius:3}}>Tier {Math.min(currentTierIdx+1,level.tiers.length)}/{level.tiers.length}</span>}</div></>}
        <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:10}}>
          <div style={{display:'flex',alignItems:'center',gap:5,padding:'3px 9px',background:`${rd.color}12`,borderRadius:12,border:`1px solid ${rd.color}25`}}>
            <div style={{width:5,height:5,borderRadius:'50%',background:rd.color}}/>
            <span style={{fontSize:11,color:rd.color,fontWeight:600}}>{rd.label}</span>
          </div>
          <div>
            <div style={{fontSize:10,color:T.muted,textAlign:'right'}}>{rank.title}</div>
            <div style={{display:'flex',alignItems:'center',gap:5,marginTop:2}}>
              <div style={{width:55,height:3,background:T.border,borderRadius:2,overflow:'hidden'}}><div style={{height:'100%',width:`${xpPct}%`,background:`linear-gradient(90deg,${T.accent},${T.accent2})`,borderRadius:2,transition:'width .4s'}}/></div>
              <span style={{fontSize:11,fontFamily:F.code,color:T.accent,fontWeight:700}}>{xp}XP</span>
            </div>
          </div>
          <span style={{fontSize:11,color:T.muted,borderLeft:`1px solid ${T.border}`,paddingLeft:8}}>{Object.keys(done).length}<span style={{opacity:.4}}>/{TOTAL_LEVELS}</span></span>
          <button onClick={()=>{const nd=!dark;setDark(nd);save(xp,done,tierProgress,pi,li,nd);}} style={{background:'none',border:`1px solid ${T.border}`,borderRadius:4,cursor:'pointer',color:T.muted,padding:'3px 7px',fontSize:12}}>{dark?'☀️':'🌙'}</button>
        </div>
      </div>

      {/* BODY */}
      <div style={{flex:1,display:'flex',overflow:'hidden'}}>
        {/* SIDEBAR */}
        {sidebar&&(
          <div style={{width:215,background:T.surface,borderRight:`1px solid ${T.border}`,overflowY:'auto',flexShrink:0,display:'flex',flexDirection:'column'}}>
            {PHASES.map((ph,phI)=>(
              <div key={phI}>
                <div style={{padding:'10px 12px 4px',display:'flex',alignItems:'center',gap:6,borderTop:phI>0?`1px solid ${T.border}`:'none'}}>
                  <span style={{fontSize:14}}>{ph.emoji}</span>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,textTransform:'uppercase',letterSpacing:'0.08em',color:ph.color}}>{ph.title}</div>
                    <div style={{fontSize:9,color:T.muted,marginTop:1,lineHeight:1.3}}>{ph.desc}</div>
                  </div>
                </div>
                {ph.levels.map((lev,lI)=>{
                  const k=`${phI}-${lI}`,doneIt=done[k],active=phI===pi&&lI===li&&mode==='learn';
                  const tp=tierProgress[k]||0;
                  return(
                    <div key={lI} className="nav-item" onClick={()=>{setPi(phI);setLi(lI);setTab('lesson');setMode('learn');}}
                      style={{padding:'6px 12px 6px 18px',cursor:'pointer',background:active?T.card:'transparent',borderLeft:active?`2px solid ${ph.color}`:'2px solid transparent',display:'flex',alignItems:'center',gap:6,fontSize:12}}>
                      <span style={{fontSize:10,color:doneIt?T.success:T.border,flexShrink:0}}>{doneIt?'✓':'○'}</span>
                      <span style={{flex:1,lineHeight:1.35,overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:active?T.text:T.muted}}>{lev.title}</span>
                      {lev.isTiered&&!doneIt&&tp>0&&<span style={{fontSize:9,color:T.accent2,flexShrink:0}}>{tp}/{lev.tiers.length}</span>}
                    </div>
                  );
                })}
              </div>
            ))}
            <div style={{marginTop:'auto',padding:12,borderTop:`1px solid ${T.border}`}}>
              <div style={{fontSize:10,color:T.muted,textTransform:'uppercase',letterSpacing:'0.08em',marginBottom:8}}>Apply</div>
              <a href="https://www.anthropic.com/careers" target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:6,padding:'7px 10px',background:`${T.accent}10`,border:`1px solid ${T.accent}25`,borderRadius:6,textDecoration:'none'}}>
                <span style={{fontSize:13}}>🎯</span>
                <span style={{fontSize:12,color:T.accent,fontWeight:600}}>Anthropic Careers</span>
              </a>
            </div>
          </div>
        )}

        {/* ANALYTICS MODE */}
        {mode==='analytics'&&<div style={{flex:1,overflowY:'auto',background:T.bg}}><Analytics xp={xp} done={done} T={T}/></div>}

        {/* LEARN MODE */}
        {mode==='learn'&&level&&(
          <>
            {/* LEFT — LESSON / CHALLENGE */}
            <div style={{width:sidebar?'calc(42% - 107px)':'42%',display:'flex',flexDirection:'column',borderRight:`1px solid ${T.border}`,overflow:'hidden',minWidth:280}}>
              {/* Tab bar */}
              <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'stretch',flexShrink:0}}>
                {[{id:'lesson',l:'📖 Lesson'},{id:'challenge',l:level.isTiered?'🏗️ OA Tiers':'💻 Challenge'},{id:'resources',l:'🔗 Resources'}].map(t=>(
                  <button key={t.id} onClick={()=>setTab(t.id)} style={{padding:'9px 12px',fontSize:12,fontWeight:tab===t.id?700:400,color:tab===t.id?T.accent:T.muted,background:'transparent',borderBottom:`2px solid ${tab===t.id?T.accent:'transparent'}`,border:'none',cursor:'pointer'}}>{t.l}</button>
                ))}
                <div style={{marginLeft:'auto',display:'flex',alignItems:'center',gap:7,paddingRight:12}}>
                  <span style={{fontSize:10,padding:'2px 7px',borderRadius:3,background:`${T.accent}12`,color:T.accent,fontWeight:600}}>{level.diff}</span>
                  <span style={{fontSize:10,color:T.muted}}>⏱{level.time}</span>
                  <span style={{fontSize:11,fontFamily:F.code,color:T.accent3,fontWeight:700}}>+{level.xp}XP</span>
                </div>
              </div>
              <div style={{flex:1,overflowY:'auto',padding:20}}>
                {tab==='lesson'&&(
                  loadingLesson?(
                    <div style={{textAlign:'center',paddingTop:40,color:T.muted}}>
                      <div style={{fontSize:28,marginBottom:10}}>✨</div>
                      <div style={{fontSize:13}}>Professor Chen is preparing your lesson...</div>
                    </div>
                  ):(
                    <>
                      <div style={{fontSize:10,color:phase.color,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:700,marginBottom:12}}>{phase.emoji} {phase.title}</div>
                      <MD text={lesson} T={T}/>
                      {lesson&&<div style={{display:'flex',gap:8,marginTop:16}}>
                        <button onClick={loadLesson} style={{padding:'4px 12px',fontSize:11,color:T.muted,background:'transparent',border:`1px solid ${T.border}`,borderRadius:4,cursor:'pointer'}}>↻ Regenerate</button>
                        <button onClick={playLesson} disabled={tts==='loading'} style={{padding:'4px 12px',fontSize:11,color:tts==='playing'?T.error:T.accent,background:tts==='playing'?`${T.error}10`:`${T.accent}10`,border:`1px solid ${tts==='playing'?`${T.error}25`:`${T.accent}25`}`,borderRadius:4,cursor:tts==='loading'?'wait':'pointer',opacity:tts==='loading'?.6:1}}>
                          {tts==='loading'?'⟳ Loading...':tts==='playing'?'⏹ Stop':'🔊 Listen'}
                        </button>
                      </div>}
                    </>
                  )
                )}
                {tab==='challenge'&&(
                  level.isTiered?(
                    <TieredChallenge
                      level={level} lKey={lKey}
                      tierProgress={tierProgress}
                      onTierComplete={handleTierComplete}
                      onLoadStarter={handleLoadStarter}
                      T={T}
                    />
                  ):(
                    <div>
                      <div style={{fontSize:10,color:T.accent2,textTransform:'uppercase',letterSpacing:'0.1em',fontWeight:700,marginBottom:12}}>💻 Challenge</div>
                      <p style={{fontSize:13,color:T.muted,lineHeight:1.7,marginBottom:16}}>Solve the problem in the editor. Run your code, then click "Complete" when passing.</p>
                      <div style={{fontSize:11,color:T.muted,fontStyle:'italic'}}>Use "Ask Professor" for Socratic hints.</div>
                    </div>
                  )
                )}
                {tab==='resources'&&(
                  <div>
                    <div style={{fontSize:10,textTransform:'uppercase',letterSpacing:'0.1em',color:T.muted,fontWeight:700,marginBottom:14}}>Anthropic-Specific Resources</div>
                    {[
                      {title:"Anthropic Careers Page",url:"https://www.anthropic.com/careers",tag:"Apply"},
                      {title:"Write Great Code Vol. 1 (2nd Ed.)",url:"https://nostarch.com/writegreatcode1_2e",tag:"Foundation"},
                      {title:"Write Great Code Vol. 2",url:"https://nostarch.com/writegreatcode2",tag:"Foundation"},
                      {title:"Anthropic Interview Process Guide",url:"https://igotanoffer.com/en/advice/anthropic-interview-process",tag:"Prep"},
                      {title:"Real Anthropic OA Questions",url:"https://www.linkjob.ai/interview-questions/anthropic-coding-interview/",tag:"OA"},
                      {title:"Anthropic Staff Eng Prep",url:"https://staffengprep.com/companies/anthropic/",tag:"Senior"},
                      {title:"interviewing.io — Anthropic Guide",url:"https://interviewing.io/anthropic-interview-questions",tag:"Guide"},
                      {title:"Designing Data-Intensive Apps",url:"https://dataintensive.net/",tag:"System Design"},
                      {title:"Python Docs — collections module",url:"https://docs.python.org/3/library/collections.html",tag:"Python"},
                      {title:"Python Docs — concurrent.futures",url:"https://docs.python.org/3/library/concurrent.futures.html",tag:"Python"},
                      {title:"Anthropic's Values (read before onsite)",url:"https://www.anthropic.com/company",tag:"Culture"},
                    ].map((r,i)=>(
                      <a key={i} href={r.url} target="_blank" rel="noopener noreferrer" style={{display:'flex',alignItems:'center',gap:9,padding:'9px 12px',background:T.card,border:`1px solid ${T.border}`,borderRadius:7,marginBottom:8,textDecoration:'none',transition:'all .12s'}}>
                        <span style={{fontSize:10,padding:'2px 7px',borderRadius:3,background:`${T.accent}10`,color:T.accent,whiteSpace:'nowrap',flexShrink:0}}>{r.tag}</span>
                        <span style={{fontSize:13,color:T.text}}>{r.title}</span>
                        <span style={{marginLeft:'auto',color:T.muted,fontSize:11}}>↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT — EDITOR */}
            <div style={{flex:1,display:'flex',flexDirection:'column',overflow:'hidden',minWidth:260}}>
              <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,padding:'6px 11px',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                <span style={{fontSize:11,color:T.muted,fontFamily:F.code,flex:1}}>🐍 solution.py — Python 3.10</span>
                <button onClick={askProf} style={{padding:'4px 10px',fontSize:11,color:T.accent2,background:`${T.accent2}10`,border:`1px solid ${T.accent2}25`,borderRadius:4,cursor:'pointer'}}>🎓 Ask Prof</button>
                <button onClick={runCode} disabled={running} style={{padding:'4px 14px',fontSize:12,fontWeight:700,background:running?T.muted:T.accent,color:T.bg,border:'none',borderRadius:5,cursor:running?'not-allowed':'pointer',opacity:running?.7:1}}>
                  {running?'⏳ Running...':'▶ Run'}
                </button>
              </div>
              <div style={{flex:1,overflow:'hidden',minHeight:0}}>
                <textarea ref={taRef} value={code} onChange={e=>setCode(e.target.value)}
                  onKeyDown={e=>{if(e.key==='Tab'){e.preventDefault();const s=e.target.selectionStart;const n=code.slice(0,s)+'    '+code.slice(e.target.selectionEnd);setCode(n);setTimeout(()=>{e.target.selectionStart=e.target.selectionEnd=s+4;},0);}}}
                  spellCheck={false} style={{width:'100%',height:'100%',background:T.edbg,color:T.edtx,fontFamily:F.code,fontSize:13,lineHeight:1.75,padding:'14px 16px',border:'none',outline:'none'}}/>
              </div>
              {/* OUTPUT */}
              <div style={{height:160,background:T.outbg,borderTop:`1px solid ${T.border}`,display:'flex',flexDirection:'column',flexShrink:0}}>
                <div style={{background:T.surface,borderBottom:`1px solid ${T.border}`,padding:'5px 11px',display:'flex',alignItems:'center',gap:8,flexShrink:0}}>
                  <span style={{fontSize:10,color:T.muted,fontFamily:F.code,textTransform:'uppercase',letterSpacing:'0.1em'}}>Output</span>
                  {output&&<span style={{fontSize:10,padding:'1px 5px',borderRadius:3,background:output.type==='success'?`${T.success}15`:output.type==='error'?`${T.error}15`:`${T.muted}20`,color:output.type==='success'?T.success:output.type==='error'?T.error:T.muted}}>{output.type==='loading'?'running':output.type}</span>}
                  {justRan&&!isDone&&output?.type==='success'&&!level.isTiered&&(
                    <button onClick={completeLevel} style={{marginLeft:'auto',padding:'3px 12px',fontSize:11,fontWeight:700,background:T.success,color:'#000',border:'none',borderRadius:4,cursor:'pointer'}}>✓ Complete (+{level.xp} XP)</button>
                  )}
                  {isDone&&<span style={{marginLeft:'auto',fontSize:11,color:T.success,fontWeight:600}}>✓ Completed</span>}
                </div>
                <div style={{flex:1,overflowY:'auto',padding:'8px 13px',fontFamily:F.code,fontSize:12,lineHeight:1.7,color:output?.type==='error'?T.error:T.accent3,whiteSpace:'pre-wrap'}}>
                  {output?output.text:<span style={{color:T.muted,fontStyle:'italic'}}>Run your code to see output here...</span>}
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* PROFESSOR PANEL */}
      {profOpen&&mode==='learn'&&(
        <div style={{position:'absolute',bottom:0,right:0,width:340,maxHeight:'50vh',background:T.surface,border:`1px solid ${T.border}`,borderTop:`2px solid ${T.accent2}`,borderLeft:`1px solid ${T.accent2}30`,borderRadius:'10px 0 0 0',display:'flex',flexDirection:'column',zIndex:200,boxShadow:'-6px -6px 30px rgba(0,0,0,.2)'}}>
          <div style={{padding:'10px 13px',borderBottom:`1px solid ${T.border}`,display:'flex',alignItems:'center',gap:9}}>
            <div style={{width:30,height:30,borderRadius:'50%',background:`linear-gradient(135deg,${T.accent},${T.accent2})`,display:'flex',alignItems:'center',justifyContent:'center',fontSize:15,flexShrink:0}}>🎓</div>
            <div><div style={{fontSize:13,fontWeight:700,color:T.text,fontFamily:F.head}}>Professor Chen</div><div style={{fontSize:10,color:T.muted}}>Former Anthropic Engineer</div></div>
            <button onClick={()=>setProfOpen(false)} style={{marginLeft:'auto',background:'none',border:'none',cursor:'pointer',color:T.muted,fontSize:20,lineHeight:1}}>×</button>
          </div>
          <div style={{flex:1,overflowY:'auto',padding:14,fontSize:13,lineHeight:1.8,color:T.text}}>
            {askingProf?(<div style={{color:T.muted,textAlign:'center',paddingTop:20,fontSize:12}}><div style={{fontSize:24,marginBottom:8}}>💭</div>Reviewing your code...</div>)
            :profMsg?(<div style={{whiteSpace:'pre-wrap'}}>{profMsg}</div>)
            :(<div style={{color:T.muted,fontSize:12,textAlign:'center',paddingTop:20}}>Loading feedback...</div>)}
          </div>
        </div>
      )}
    </div>
  );
}
