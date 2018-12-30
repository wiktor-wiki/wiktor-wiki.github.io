```lua
--[[
   This is an example Range iterator implementation
--]]

function range(from, to, step)
  step = step or 1

  local iter = function(_, lastvalue)
    local nextvalue = lastvalue + step

    if step > 0 and nextvalue <= to or step < 0 and nextvalue >= to or
       step == 0
    then
      return nextvalue
    end
  end

  return iter, nil, from - step
end
```
