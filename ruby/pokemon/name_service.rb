module NameService
  attr_reader :name

  def change_name(new_name)
    if new_name == "うんこ"
      puts "不適切な名前です"
    else
      @name = new_name
    end
  end
end