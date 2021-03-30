create database Wa_Forum;
use Wa_Forum;
create table User(id int primary key,registrationNumber int,contribution int,displayName varchar(100),aboutMe varchar(1000),
github varchar(100),codechef varchar(100),codeforces varchar(100),
email varchar(32),password varchar_ignorecase(100), lastOnline datetime);

create table Posts(id int primary key,postTypeID int,acceptedAnswerID int, parentID int,  creationDate datetime, upvoteCount int,
 body text,ownerUserID int ,ownerDisplayName varchar(100),lastEditorUserID int , lastEditorDisplayName varchar(100),
 lastEditDate datetime,lastActivityDate datetime,answerCount int,commentCount int,
foreign key (acceptedAnswerID) references Posts(id) on delete set null,
foreign key (parentID) references Posts(id) on delete cascade,
foreign key (ownerUserID) references User(id) on delete set null,
foreign key (lastEditorUserID) references User(id) on delete set null);

create table allTags(id int primary key,tag varchar(100));

create table Tags(id int primary key,postID int,tagID int, foreign key(postID) references Posts(id) on delete cascade,
foreign key(tagID) references allTags(id));

create table suggestedEdits(id int,postID int, creationDate datetime, apporvalDate datetime,rejectionDate datetime,
 ownerUserID int,comment text,body text , suggestedTags int,foreign key(suggestedTags) 
 references allTags(id), foreign key(ownerUserID) references User(id) on delete set null);
 
create table followerData(userID int, followerID int, foreign key(followerID) references User(id) on delete cascade,
foreign key(userID) references User(id) on delete cascade);

create table followingData(userID int, followingID int, foreign key(followingID) references User(id) on delete cascade,
foreign key(userID) references User(id) on delete cascade);

create table Comments(id int primary key,postID int, body text,creationDate datetime,
userDisplayName varchar(100),userID int,foreign key(postID) references Posts(id) on delete cascade,
foreign key(userID) references User(id) on delete set null); 

create table Votes(id int primary key ,postID int, typeOf int, userID int,
unique(postID, userID)
foreign key(postID) references Posts(id) on delete cascade,foreign key(userID) references User(id) on delete cascade);

create table passwordSalt(userID int, salt binary(64),foreign key(userID) references User(id) on delete cascade);
