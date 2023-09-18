# ABCDEFという6人のグループがある
group = %w[A B C D E F]

# 3人か2人に分かれるようにする
r = rand(2..3)

# 3人か2人に分けた1つ目のグループを作って昇順に並べる
group1 = group.sample(r).sort

# グループ全体から1つ目のグループ以外の人を取り出す
group2 = (group - group1).sort

p group1
p group2
