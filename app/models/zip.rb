class Zip < ActiveRecord::Base
  # attr_accessible :title, :body


  def self.get_data

    data = 'tmp/fire-data.csv'

    states = []

    x = 0
    max = 0

    CSV.foreach(data) do |row|

      states <<  [row[1],row[2], get_range(row[2])] if x > 0

      max = row[2].to_i if max < row[2].to_i


      x += 1

    end

    #puts states['FL']

    #puts max

    states
  end

  def self.get_range(value)

    range = [0,5,10,25,100,250,500,650,750,800,900,1000,1100]

    range.each_with_index do |num, index|

      if index+1 < range.count and num > value.to_i and value.to_i < range[index+1]
        return (index+1).to_i
      elsif index+1 >= range.count
        return range.count.to_i
      end

    end
  end


end
