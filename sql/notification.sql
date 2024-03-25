CREATE TABLE `notification` (			
`notifyID` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,			
`notify_type` VARCHAR(100) NOT NULL default '',			
`postID` INT NOT NULL default 0,
`userID` INT NOT NULL default 0,
`reply_type` int not null default 0,
`c_datetime` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP		
)