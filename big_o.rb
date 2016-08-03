#################################
# Big O Notation examples in Ruby
#################################
# run irb -I . -r big_o.rb
#################################
# Example: 
# run 'a = BigONotation.new(10000)'
# then 'a.linear_search(20)'
# and compare to running 'b = BigONotation.new(20000)'
# and 'b.linear_search(20)
# the amount of time should increase proportionally with N (size of array) 
#################################

class BigONotation
  attr_accessor :items_in_array, :array

  def initialize(size)
    @array = Array.new(size)
    @array_size = size
    @items_in_array = 0
    generate_array(@array)
  end

  # O(1) - perform the same no matter the size of the array
  def add_to_array(new_item)
    start_time = Time.now
    @array[@items_in_array] = new_item
    end_time = Time.now
    @items_in_array += 1
  end

  # O(n) - performs in correlation to N
  def linear_search(value)
    start_time = Time.now.to_f
    
    @array.each do |a|
      if a == value
        end_time = Time.now.to_f
        return "Linear Search took #{(end_time - start_time).round(3)}s"  
      end
    end
  end

  # O(n^2) - performs to N squared (slow)
  def bubble_sort
    start_time = Time.now.to_f
    sort_size = @array_size - 1

    (sort_size).times do
      @array.each_with_index do |a,i|
        if i < sort_size && a > @array[i+1]
          swap_values(i,i+1)
        end
      end
    end

    end_time = Time.now.to_f
    p @array
    "Bubble Sort took #{(end_time - start_time).round(3)}s"  
  end

  # O(log n)
  def binary_search(value)
    start_time = Time.now.to_f
    low_index = 0
    high_index = @array_size - 1
    iterations = 0

    while low_index < high_index
      middle_index = (high_index + low_index)/2
      if @array[middle_index] < value
        low_index = middle_index + 1
      elsif @array[middle_index] > value
        high_index = middle_index - 1
      else 
        low_index = high_index + 1
        p "Found match in index #{middle_index}"
      end
      iterations += 1
    end

    end_time = Time.now.to_f
    p "Binary Search took #{(end_time - start_time).round(3)}s"  
    p "Iterations: #{iterations}"
  end

  # O(n log n)
  def quick_sort(array)
    return array if array.length <= 1

    pivot_index = (array.length / 2).to_i
    pivot_value = array[pivot_index]
    array.delete_at(pivot_index)
    left,right = array.partition{|x| x < pivot_value}
    return quick_sort(left) + [pivot_value] + quick_sort(right)
  end

  def call_quick_sort(array)
    start_time = Time.now.to_f
    end_array = quick_sort(array)
    end_time = Time.now.to_f
    p end_array
    p "Quick Sort took #{(end_time - start_time).round(6)}s"  
  end

  def generate_array(array)
    array.each_with_index do |a,i|
      array[i] = rand(1000)+10
    end
    @items_in_array = @array_size - 1
  end

  def swap_values(index1, index2)
    a = @array[index1]
    @array[index1] = @array[index2]
    @array[index2] = a
  end
end

