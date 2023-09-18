# Rubyでカレンダーをつくる
# 月曜始まりで実装する(日曜日で改行する)
# Gemは使用しない
# 標準ライブラリを使用
# -mオプションで月を指定できるようにする
# -mの引数が不正な月はエラーを出す

# 1.1~30or31までの日にちを出力できるようにする
# 2.並べた数字を日曜日で改行するように並べる
# 3.1~9の数字には先頭にスペースを1つ入れる
# 4.1行目を曜日に合った配置にする
# 5.年月日の表示をできるようにする
# 6.曜日の表示をできるようにする
# 7.引数が不正なときのエラーの表示をする

require 'optparse'
require 'date'

opt = OptionParser.new

params = {}
opt.on('-m VAL', Integer, 'Month (1-12)') {|v| params[:m] = v}
opt.parse!(ARGV, into: params)

today = Date.today
year = today.year
month = params[:m] || today.month

unless (1..12).include?(month)
  puts "#{month} is neither a month number (1..12) nor a name."
  exit(1)
end


puts "#{month}月 #{year}".center(20)


month_start_day = Date.new(year, month, +1)
month_last_day = Date.new(year, month, -1)

puts "月 火 水 木 金 土 日"

if month_start_day.wday == 0
  print "   " * 6
else
  print "   " * (month_start_day.wday - 1)
end

(month_start_day..month_last_day).each do |d|
  if d.wday == 0 && d.day <= 9
    puts " #{d.day} "
  elsif d.wday == 0
    puts "#{d.day} "
  elsif d.day <= 9
    print " #{d.day} "
  else
    print "#{d.day} "
  end
end
